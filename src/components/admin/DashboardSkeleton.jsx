import { motion } from 'framer-motion'

const DashboardSkeleton = () => {
  const skeletonVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const shimmerVariants = {
    initial: { x: -100 },
    animate: { x: 100 },
    exit: { x: 100 }
  }

  const SkeletonCard = ({ height = "h-32", width = "w-full" }) => (
    <motion.div
      variants={skeletonVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`${height} ${width} bg-gray-200 dark:bg-gray-700 rounded-xl relative overflow-hidden`}
    >
      <motion.div
        variants={shimmerVariants}
        animate="animate"
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <SkeletonCard height="h-12" width="w-48" />
        <SkeletonCard height="h-6" width="w-64" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-4">
            <SkeletonCard height="h-32" />
          </div>
        ))}
      </div>

      {/* Charts Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonCard height="h-80" />
        <SkeletonCard height="h-80" />
      </div>

      {/* Bottom Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonCard height="h-64" />
        <SkeletonCard height="h-64" />
      </div>
    </div>
  )
}

export default DashboardSkeleton
