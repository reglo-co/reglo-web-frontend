export function BlurAnimation() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-24 -left-24 h-72 w-72 animate-[move1_18s_ease-in-out_infinite] rounded-full bg-zinc-500/25 mix-blend-multiply blur-3xl [will-change:transform] dark:mix-blend-screen" />
      <div className="absolute top-1/3 -right-12 h-80 w-80 animate-[move2_22s_ease-in-out_infinite] rounded-full bg-zinc-500/25 mix-blend-multiply blur-3xl [will-change:transform] dark:mix-blend-screen" />
      <div className="absolute -bottom-16 left-1/3 h-96 w-96 animate-[move3_20s_ease-in-out_infinite] rounded-full bg-zinc-500/25 mix-blend-multiply blur-3xl [will-change:transform] dark:mix-blend-screen" />
    </div>
  )
}
