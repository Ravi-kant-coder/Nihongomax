"use client";

const benefits = [
  "N5",
  "N4",
  "N3",
  "N2",
  "N1",
  "BUSINESS JAPANESE",
  "KAIWA",
  "ビジネス英語",
  "英会話",
  "Jobs and Japan Schools information",
];

const comparisonRows = [
  {
    title: "Cost/year",
    nihongo: "Around $80",
    institute: "$500 ~ $700",
    bg: "bg-[#dcecf3] dark:bg-[#3d474b]",
  },
  {
    title: "Revision",
    nihongo: "No Cost",
    institute: "Same cost",
    bg: "bg-[#f4dddd] dark:bg-[#493d40]",
  },
  {
    title: "Teachers Quality",
    nihongo: (
      <>
        JLPT N1, 7 Years Japan
        <br />
        exp, 10 years work-ex
      </>
    ),
    institute: (
      <>
        If qualified enough, the cost
        <br />
        will be much higher
      </>
    ),
    bg: "bg-[#edf4dc] dark:bg-[#42483a]",
  },
  {
    title: "Content Quality",
    nihongo: (
      <>
        Divided as per level and
        <br />
        gradual increase
      </>
    ),
    institute: "Random contents",
    bg: "bg-[#f9e9d9] dark:bg-[#4b423b]",
  },
  {
    title: "Time",
    nihongo: (
      <>
        Flexible and duration
        <br />
        length as you wish
      </>
    ),
    institute: (
      <>
        Fixed duration and No
        <br />
        flexible timing
      </>
    ),
    bg: "bg-[#dce8f3] dark:bg-[#3d454d]",
  },
  {
    title: "Transport",
    nihongo: "Your Bedroom",
    institute: (
      <>
        Rain, Metro-charges,
        <br />
        Sun-tan, sweating
      </>
    ),
    bg: "bg-[#edf4dc] dark:bg-[#42483a]",
  },
  {
    title: "Support",
    nihongo: "Wall",
    institute: "Not at all",
    bg: "bg-[#f4dddd] dark:bg-[#493d40]",
  },
];

export default function Comparison() {
  return (
    <section className="w-full px-3 py-8 sm:px-5 md:px-6">
      <div className="mx-auto w-full max-w-[1000px] flex flex-col items-center justify-center">
        <div>
          <h2
            className="text-[30px] font-extrabold leading-tight tracking-wide text-teal-800 sm:text-[38px] md:text-[44px]
        dark:text-teal-500"
          >
            WHAT WILL YOU GET ?
          </h2>
          <div className="mx-auto mt-5 w-full max-w-[650px]">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="
                flex
                items-start
                gap-5
                py-[4px]
                sm:gap-7
              "
              >
                {/* Green check */}
                <div
                  className="
                  mt-[2px]
                  flex
                  h-[38px]
                  w-[45px]
                  shrink-0
                  items-center
                  justify-center
                  text-[48px]
                  font-black
                  leading-none
                  text-[#008b18] dark:text-[#00ff00]
                  sm:mt-[3px]
                  sm:h-[43px]
                  sm:w-[52px]
                  sm:text-[55px]
                "
                >
                  ✓
                </div>

                {/* Text */}
                <div
                  className="
                  pt-[4px]
                  text-[26px]
                  font-bold
                  leading-[1.15]
                  text-teal-800
                  dark:text-teal-500
                  sm:text-[31px]
                "
                >
                  {benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Comparison Heading */}
        <div
          className="mt-8 flex items-center justify-center bg-[#edf5df] text-center font-bold text-green-800 py-4
        px-8 rounded-2xl dark:bg-green-900 dark:text-white sm:mt-10 sm:px-10 md:mt-12 md:px-12
        lg:mt-14 lg:px-14"
        >
          <p className="sm:text-lg md:text-2xl lg:text-4xl">
            Let’s compare main 7 differences
          </p>
        </div>

        {/* Comparison Table */}
        <div className="w-full overflow-hidden border">
          <table className="w-full text-center">
            <thead>
              <tr>
                {/* Empty top-left cell */}
                <th className="w-[21%] border border-black bg-[#f8e6d9] dark:bg-[rgb(74,64,59)]" />

                <th
                  className="
                    w-[38%]
                    border
                    border-black
                    bg-[#f8e6d9] dark:bg-[#4a403b]
                    px-1
                    py-2
                    text-[19px]
                    font-semibold
                    leading-tight
                    sm:text-[25px]
                    text-black dark:text-gray-300
                  "
                >
                  NIHONGOMAX.COM
                </th>

                <th
                  className="
                    w-[41%]
                    border
                    border-black
                    bg-[#f8e6d9] dark:bg-[#4a403b]
                    px-1
                    py-2
                    text-[19px]
                    font-bold
                    leading-tight
                    sm:text-[25px]
                    text-black dark:text-gray-300
                  "
                >
                  Any Institute
                </th>
              </tr>
            </thead>

            <tbody>
              {comparisonRows.map((row, index) => (
                <tr key={index} className={row.bg}>
                  {/* Row title */}
                  <th
                    className="
                      border
                      border-black
                      px-1
                      py-2
                      text-[17px]
                      font-semibold
                      leading-tight
                      sm:text-[22px]
                      text-black dark:text-gray-300
                    "
                  >
                    {row.title}
                  </th>

                  {/* NihongoMax */}
                  <td
                    className="
                      border
                      border-black
                      px-1
                      py-2
                      text-[16px]
                      leading-[1.2]
                      sm:text-[20px]
                     text-black dark:text-gray-400
                    "
                  >
                    {row.nihongo}
                  </td>

                  {/* Institute */}
                  <td
                    className="
                      border
                      border-black
                      px-1
                      py-2
                      text-[16px]
                      leading-[1.2]
                      sm:text-[20px]
                      text-black dark:text-gray-400
                    "
                  >
                    {row.institute}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
