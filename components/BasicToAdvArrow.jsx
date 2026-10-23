export default function BasicToAdvanced() {
  return (
    <div className="flex w-full items-center gap-3 px-20">
      <span className="shrink-0 text-sm font-normal tracking-wider text-black sm:text-base">
        BASIC
      </span>

      <div className="flex min-w-0 flex-1 items-center">
        <div className="h-[2px] min-w-0 flex-1 bg-gradient-to-r from-gray-300 to-gray-600" />

        <svg
          viewBox="0 0 12 14"
          className="h-3.5 w-3 shrink-0 -ml-px"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1 L10 7 L1 13"
            stroke="#4B5563"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <span className="shrink-0 text-sm font-normal tracking-wider text-black sm:text-base">
        ADVANCED
      </span>
    </div>
  );
}
