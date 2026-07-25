type Theme = "blue" | "white";

interface NewLaunchSectionHeadingProps {
  kicker?: string;
  title: string;
  titleAccent?: string;
  titleSuffix?: string;
  description?: string;
  theme?: Theme;
  align?: "center" | "left";
  className?: string;
}

export default function NewLaunchSectionHeading({
  kicker,
  title,
  titleAccent,
  titleSuffix,
  description,
  theme = "white",
  align = "center",
  className = "",
}: NewLaunchSectionHeadingProps) {
  const isBlue = theme === "blue";
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const kickerColor = isBlue ? "bg-cyan-400" : "bg-blue";
  const kickerText = isBlue ? "text-cyan-400" : "text-blue";
  const titleColor = isBlue ? "text-white" : "text-[#010048]";
  const accentGradient = isBlue
    ? "from-[#00D4FF] to-[#00F5C8]"
    : "from-[#010048] via-[#0047AB] to-[#00D4FF]";
  const descColor = isBlue ? "text-white/50" : "text-gray-600";

  return (
    <div className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      {kicker && (
        <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          <div className={`w-6 h-[1px] ${kickerColor}`} />
          <p className={`text-[11px] font-bold tracking-[0.25em] uppercase ${kickerText}`}>{kicker}</p>
          {align === "center" && <div className={`w-6 h-[1px] ${kickerColor}`} />}
        </div>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] ${titleColor}`}>
        {title}{" "}
        {titleAccent && (
          <span className={`font-serif font-bold italic text-transparent bg-clip-text bg-gradient-to-r ${accentGradient} tracking-tight`}>
            {titleAccent}
          </span>
        )}
        {titleSuffix}
      </h2>
      {description && (
        <p className={`text-sm font-medium leading-relaxed max-w-3xl ${descColor} ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
