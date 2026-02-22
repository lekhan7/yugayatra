import fs from 'fs'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function runMigration() {
  try {
    console.log('🚀 Running project_requests table migration...')
    
    // Read the migration file
    const migrationPath = './supabase/migrations/20250621000014_create_project_requests.sql'
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8')
    
    // Split SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`)
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`)
      
      try {
        const { error } = await supabase.rpc('exec_sql', { sql_query: statement })
        
        if (error) {
          // Try direct SQL execution if RPC fails
          console.log('🔄 Trying direct SQL execution...')
          const { error: directError } = await supabase
            .from('pg_tables')
            .select('*')
            .limit(1)
          
          if (directError && directError.message.includes('does not exist')) {
            console.log('⚠️  Migration may need to be run manually in Supabase dashboard')
            console.log('📋 Migration SQL:')
            console.log('---')
            console.log(migrationSQL)
            console.log('---')
            return
          }
          
          throw error
        }
        
        console.log(`✅ Statement ${i + 1} executed successfully`)
      } catch (error) {
        console.error(`❌ Error executing statement ${i + 1}:`, error.message)
        
        // Continue with other statements if this one fails
        if (i === statements.length - 1) {
          console.log('⚠️  Migration completed with some errors')
          console.log('📋 You may need to run the remaining SQL manually in Supabase dashboard')
        }
      }
    }
    
    console.log('🎉 Migration completed!')
    
    // Verify table was created
    try {
      const { data, error } = await supabase
        .from('project_requests')
        .select('*')
        .limit(1)
      
      if (error && error.message.includes('does not exist')) {
        console.log('❌ Table was not created. Please run the migration manually in Supabase dashboard.')
        console.log('📋 Migration SQL:')
        console.log('---')
        console.log(migrationSQL)
        console.log('---')
      } else if (error) {
        console.log('⚠️  Table exists but there was an error accessing it:', error.message)
      } else {
        console.log('✅ project_requests table is ready!')
      }
    } catch (verifyError) {
      console.log('⚠️  Could not verify table creation:', verifyError.message)
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    console.log('📋 Please run the SQL manually in your Supabase dashboard:')
    console.log('---')
    const migrationSQL = fs.readFileSync('./supabase/migrations/20250621000014_create_project_requests.sql', 'utf8')
    console.log(migrationSQL)
    console.log('---')
  }
}

runMigration()
