import { cn } from "../../lib/utils"

const badgeVariants = {
  default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
  outline: "text-foreground",
}

const badgeSizes = {
  default: "px-2.5 py-0.5",
  sm: "px-2 py-0.5 text-xs",
}

export const Badge = ({ className, variant = "default", size = "default", ...props }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeVariants[variant],
        badgeSizes[size],
        className,
      )}
      {...props}
    />
  )
}
