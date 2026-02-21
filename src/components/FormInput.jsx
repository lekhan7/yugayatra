import { motion } from 'framer-motion'

const FormInput = ({
  id,
  label,
  required = false,
  error,
  inputClassName = '',
  as = 'input',
  className = '',
  ...props
}) => {
  const Component = as

  return (
    <div className={className}>
      {label ? (
        <label htmlFor={id} className="block text-sm font-medium text-text-main mb-2">
          {label}{required ? ' *' : ''}
        </label>
      ) : null}

      <motion.div
        initial={false}
        animate={error ? { x: [-2, 2, -2, 2, 0] } : { x: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Component
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full px-4 py-3 rounded-xl border bg-white/40 backdrop-blur-md shadow-[0_10px_30px_rgba(13,37,69,0.08)] transition-colors outline-none text-text-main placeholder:text-text-light/80 ${
            error
              ? 'border-red-300 focus:ring-2 focus:ring-red-400/60'
              : 'border-border-light focus:ring-2 focus:ring-cyan-400/60 focus:border-transparent'
          } ${as === 'textarea' ? 'resize-none' : ''} ${inputClassName}`}
          {...props}
        />
      </motion.div>

      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default FormInput
