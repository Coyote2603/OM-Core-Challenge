/* The Periodic Review, Quality & Planning Challenge
 *
 * Worked multiple-choice problems spanning three core OM topics: periodic
 * review inventory policies, statistical quality control, and aggregate
 * production planning. Unlike the Inventory Management Challenge (which is
 * meant to grow within a single theme), this challenge groups three
 * distinct topics into one practice set, matching how the source question
 * bank was authored.
 *
 * Every wrong option carries its own targeted hint; the correct option
 * carries the full worked solution. A learner can try any option, get the
 * hint for that specific misconception, and try again until they find the
 * correct one — nothing is timed or auto-advanced.
 *
 * Shares its visual styling (css/om-challenge.css) and interaction pattern
 * with the OM Core and Inventory Management Challenges, but is a fully
 * independent question set and page — this file never loads alongside
 * js/om-challenge.js or js/inventory-challenge.js.
 */

const PQP_CHALLENGE_QUESTIONS = Object.freeze([
  // ---- Periodic review inventory (Q1-Q5) ----
  Object.freeze({
    id: 1,
    kicker: "Periodic review — order-up-to level",
    title: "Supermarket replenishment",
    context: `<p>A supermarket reviews milk inventory every 7 days. Daily demand is normally distributed with mean 100 units and standard deviation 20 units. Supplier lead time is 3 days.</p>`,
    question: "For a 95% cycle service level (z = 1.645), what is the order-up-to level?",
    options: [
      {
        key: "A",
        text: "1,087",
        correct: false,
        hint: "This scales the safety-stock term by the square root of the review period alone (\\(\\sqrt{7}\\)) rather than the full protection period. Safety stock must cover demand uncertainty over the review period plus lead time together (\\(T+L=10\\) days), not the review period by itself."
      },
      {
        key: "B",
        text: "1,052",
        correct: false,
        hint: "This scales the safety-stock term by the square root of the lead time alone (\\(\\sqrt{3}\\)) rather than the full protection period. Both the review period and the lead time belong under the square root together — \\(\\sqrt{T+L}\\), not \\(\\sqrt{L}\\) or \\(\\sqrt{T}\\) separately."
      },
      {
        key: "C",
        text: "1,104",
        correct: true,
        solution: `<p>The order-up-to level under periodic review is \\(S = \\bar d (T+L) + z\\sigma\\sqrt{T+L}\\), where \\(T\\) is the review period and \\(L\\) is the lead time.</p>
          <p>\\[ S = 100(7+3) + 1.645(20)\\sqrt{10} = 1000 + 104.04 \\approx \\textbf{1,104 units} \\]</p>`
      },
      {
        key: "D",
        text: "1,033",
        correct: false,
        hint: "This leaves out the square-root time-scaling on the safety-stock term entirely (\\(z\\sigma\\) instead of \\(z\\sigma\\sqrt{T+L}\\)). Demand-uncertainty protection grows with the square root of the exposure period, not with a flat \\(z\\sigma\\)."
      }
    ]
  }),

  Object.freeze({
    id: 2,
    kicker: "Periodic review — inventory position",
    title: "E-commerce replenishment",
    context: `<p>An online retailer has an order-up-to level of 650 units. It has 180 units on hand, 120 units on order, and 30 backordered.</p>`,
    question: "How many units should it order?",
    options: [
      {
        key: "A",
        text: "350",
        correct: false,
        hint: "This leaves backorders out of inventory position entirely. Inventory position = on-hand + on-order − backorders; a backorder is demand already owed, so it has to reduce the position, not be ignored."
      },
      {
        key: "B",
        text: "380",
        correct: true,
        solution: `<p>Inventory position = on-hand + on-order − backorders = \\(180 + 120 - 30 = 270\\).</p>
          <p>Order quantity = order-up-to level − inventory position = \\(650 - 270 = \\) <strong>380 units</strong>.</p>`
      },
      {
        key: "C",
        text: "470",
        correct: false,
        hint: "This leaves the 120 units already on order out of inventory position, as if only on-hand and backorders counted. Inventory position includes everything already committed to arriving — on-hand plus on-order — minus what's already owed."
      },
      {
        key: "D",
        text: "320",
        correct: false,
        hint: "This adds the backorders to inventory position instead of subtracting them (\\(180+120+30=330\\), then a further slip to 320). Backorders are unmet demand sitting against the position, so they reduce it: \\(180+120-30\\), not \\(+30\\)."
      }
    ]
  }),

  Object.freeze({
    id: 3,
    kicker: "Periodic review — service-level upgrade",
    title: "Pharmacy service level",
    context: `<p>A pharmacy reviews inventory every 10 days and has a 4-day lead time. Daily demand standard deviation is 12 units.</p>`,
    question: "How much additional safety stock is needed to raise the cycle service level from 95% (z = 1.645) to 99% (z = 2.326)?",
    options: [
      {
        key: "A",
        text: "31",
        correct: true,
        solution: `<p>Only the incremental safety stock is needed — the change in \\(z\\) applied to the same protection-period standard deviation.</p>
          <p>Additional SS = \\((z_{99\\%} - z_{95\\%})\\,\\sigma\\sqrt{T+L} = (2.326 - 1.645)(12)\\sqrt{14} \\approx \\textbf{31 units}\\).</p>`
      },
      {
        key: "B",
        text: "115",
        correct: false,
        hint: "This computes the full 99% safety stock from scratch (\\(z_{99\\%}\\,\\sigma\\sqrt{T+L}\\)) rather than the incremental amount needed on top of what's already held at 95%. The question asks for the additional safety stock, so use \\((z_{99\\%}-z_{95\\%})\\), not \\(z_{99\\%}\\) alone."
      },
      {
        key: "C",
        text: "43",
        correct: false,
        hint: "This treats the standard deviation as scaling linearly with the protection period rather than with its square root. Demand-uncertainty protection scales with \\(\\sqrt{T+L}\\), not \\(T+L\\) itself."
      },
      {
        key: "D",
        text: "8",
        correct: false,
        hint: "This uses only the lead time (4 days) as the protection period, leaving out the 10-day review period. The relevant exposure window for a periodic-review policy is the review period plus the lead time (\\(T+L=14\\) days), since an order placed now won't be reviewed again for another \\(T\\) days."
      }
    ]
  }),

  Object.freeze({
    id: 4,
    kicker: "Periodic review — demand shift",
    title: "Fashion promotion",
    context: `<p>A clothing retailer reviews stock every 7 days with a 5-day lead time. Daily demand has mean 60 and standard deviation 18 units. A promotion raises the mean by 25% and the standard deviation by 50%.</p>`,
    question: "At z = 1.96, approximately how much does the order-up-to level increase?",
    options: [
      {
        key: "A",
        text: "180",
        correct: false,
        hint: "This captures only the increase from higher expected demand, \\((75-60)(T+L)\\), and leaves out the extra safety stock needed because demand is now more variable too. Both the mean shift and the standard-deviation shift raise \\(S\\), and both need to be added."
      },
      {
        key: "B",
        text: "241",
        correct: true,
        solution: `<p>The order-up-to level is \\(S = \\bar d(T+L) + z\\sigma\\sqrt{T+L}\\), with protection period \\(T+L = 7+5=12\\) days.</p>
          <p>New mean = \\(60 \\times 1.25 = 75\\); new standard deviation = \\(18 \\times 1.5 = 27\\).</p>
          <p>Increase = \\((75-60)(12) + 1.96(27-18)\\sqrt{12} = 180 + 61.1 \\approx \\textbf{241 units}\\).</p>`
      },
      {
        key: "C",
        text: "61",
        correct: false,
        hint: "This captures only the extra safety stock from higher demand variability, \\(1.96(27-18)\\sqrt{12}\\), and leaves out the increase from higher expected demand itself. Both components move \\(S\\) upward and both belong in the total."
      },
      {
        key: "D",
        text: "211",
        correct: false,
        hint: "This scales the standard-deviation shift by the wrong time window (for example \\(\\sqrt{T}\\) or \\(\\sqrt{L}\\) alone) instead of the full protection period. Both the mean-shift term and the standard-deviation-shift term use the same \\(T+L=12\\) days."
      }
    ]
  }),

  // ---- Quality management (Q5-Q9) ----
  Object.freeze({
    id: 5,
    kicker: "Quality management — X-bar chart",
    title: "Automotive X-bar chart",
    context: `<p>A shaft manufacturer samples 5 parts every hour. The grand mean is 20 mm and the average range is 0.4 mm. \\(A_2 = 0.577\\) for a subgroup size of 5.</p>`,
    question: "What is the X-bar chart's upper control limit (UCL)?",
    options: [
      {
        key: "A",
        text: "20.231 mm",
        correct: true,
        solution: `<p>The X-bar chart control limits are \\(\\bar{\\bar x} \\pm A_2\\bar R\\).</p>
          <p>\\(\\text{UCL} = 20 + 0.577(0.4) = 20.2308 \\approx \\) <strong>20.231 mm</strong>.</p>`
      },
      {
        key: "B",
        text: "20.400 mm",
        correct: false,
        hint: "This adds the average range directly to the grand mean, skipping the \\(A_2\\) factor. \\(A_2\\) converts the average range into the right-sized control-limit offset for this subgroup size — it isn't optional."
      },
      {
        key: "C",
        text: "20.103 mm",
        correct: false,
        hint: "This divides \\(A_2\\) by \\(\\sqrt{n}\\) before applying it, as if it were a raw standard deviation needing its own sample-size correction. \\(A_2\\) is already a tabulated constant built for this exact purpose — use it directly, with no further adjustment."
      },
      {
        key: "D",
        text: "19.769 mm",
        correct: false,
        hint: "This is the lower control limit (\\(\\bar{\\bar x} - A_2\\bar R\\)), not the upper one. The question asks for the UCL, which subtracts nothing — it adds the \\(A_2\\bar R\\) term to the grand mean."
      }
    ]
  }),

  Object.freeze({
    id: 6,
    kicker: "Quality management — p-chart",
    title: "Food-packaging p-chart",
    context: `<p>A food company inspects 200 packets daily. Over 20 days, it finds 160 defective packets. On a subsequent day, 18 of 200 packets are defective.</p>`,
    question: "What is the correct 3-sigma p-chart conclusion?",
    options: [
      {
        key: "A",
        text: "UCL = 0.040; out of control",
        correct: false,
        hint: "0.040 is the center line (\\(\\bar p\\)), not the upper control limit — the UCL has to sit above \\(\\bar p\\) by \\(3\\) standard errors. Compute \\(\\bar p + 3\\sqrt{\\bar p(1-\\bar p)/n}\\), not \\(\\bar p\\) alone."
      },
      {
        key: "B",
        text: "UCL = 0.082; out of control",
        correct: true,
        solution: `<p>\\(\\bar p = \\dfrac{160}{200 \\times 20} = \\dfrac{160}{4000} = 0.04\\).</p>
          <p>\\(\\text{UCL} = \\bar p + 3\\sqrt{\\dfrac{\\bar p(1-\\bar p)}{n}} = 0.04 + 3\\sqrt{\\dfrac{0.04(0.96)}{200}} \\approx 0.0816\\).</p>
          <p>The day's observed defective fraction is \\(18/200 = 0.09\\), which exceeds \\(0.0816\\) — <strong>out of control</strong>.</p>`
      },
      {
        key: "C",
        text: "UCL = 0.122; in control",
        correct: false,
        hint: "This uses the wrong subgroup size in the standard-error denominator — most likely treating the 20-day history (4,000 inspections) as a single subgroup instead of using the daily sample size, \\(n=200\\), that each day's observation is actually compared against."
      },
      {
        key: "D",
        text: "UCL = 0.082; in control",
        correct: false,
        hint: "The UCL value here is right, but the conclusion isn't: the observed defective fraction that day is \\(18/200=0.09\\), which is above \\(0.082\\), not below it. A point above the UCL signals out of control, not in control."
      }
    ]
  }),

  Object.freeze({
    id: 7,
    kicker: "Quality management — c-chart",
    title: "Hotel complaints c-chart",
    context: `<p>A hotel averages 4 guest complaints per day. Assume a constant opportunity for complaints each day.</p>`,
    question: "What is the 3-sigma c-chart UCL, and what's the conclusion for a day with 11 complaints?",
    options: [
      {
        key: "A",
        text: "UCL 10; investigate",
        correct: true,
        solution: `<p>For a c-chart, the control limits are \\(\\bar c \\pm 3\\sqrt{\\bar c}\\), since the variance of a Poisson count equals its mean.</p>
          <p>\\(\\text{UCL} = 4 + 3\\sqrt{4} = 4 + 6 = 10\\). Since 11 complaints exceeds the UCL of 10, the process signals <strong>out of control — investigate</strong>.</p>`
      },
      {
        key: "B",
        text: "UCL 16; no signal",
        correct: false,
        hint: "This adds \\(3\\bar c\\) to the mean instead of \\(3\\sqrt{\\bar c}\\) (\\(4 + 3(4) = 16\\)). A c-chart's control limit is the mean plus three times the square root of the mean, not three times the mean itself."
      },
      {
        key: "C",
        text: "UCL 6; investigate",
        correct: false,
        hint: "This adds only one standard deviation (\\(4+\\sqrt4=6\\)) instead of three. A 3-sigma control limit needs the full \\(3\\sqrt{\\bar c}\\) term, not a single \\(\\sqrt{\\bar c}\\)."
      },
      {
        key: "D",
        text: "UCL 10; no signal",
        correct: false,
        hint: "The UCL here is right, but the conclusion isn't — 11 complaints exceeds a UCL of 10, which is itself the signal to investigate, not a reason to conclude the process is fine."
      }
    ]
  }),

  Object.freeze({
    id: 8,
    kicker: "Quality management — process capability",
    title: "Tablet process capability",
    context: `<p>Tablet weights have specification limits of 490 and 510 mg. The process mean is 503 mg and the standard deviation is 3 mg.</p>`,
    question: "Which pair is closest to (Cp, Cpk)?",
    options: [
      {
        key: "A",
        text: "(1.11, 1.11)",
        correct: false,
        hint: "\\(C_p\\) only measures whether the specification spread is wide enough relative to process variation — it ignores where the process is centered. Since the process mean (503) sits off-center within the spec window, \\(C_{pk}\\) (which accounts for centering) should come out lower than \\(C_p\\), not equal to it."
      },
      {
        key: "B",
        text: "(0.78, 1.11)",
        correct: false,
        hint: "These two values are swapped. \\(C_p\\) depends only on the specification width relative to \\(6\\sigma\\) — it doesn't change with centering — while \\(C_{pk}\\) depends on the distance to the nearer specification limit, which is smaller here because the process mean (503) sits closer to the upper limit (510) than to the center (500)."
      },
      {
        key: "C",
        text: "(1.11, 0.78)",
        correct: true,
        solution: `<p>\\(C_p = \\dfrac{USL - LSL}{6\\sigma} = \\dfrac{510-490}{6(3)} = \\dfrac{20}{18} \\approx 1.11\\).</p>
          <p>\\(C_{pk} = \\dfrac{\\min(USL-\\mu,\\ \\mu-LSL)}{3\\sigma} = \\dfrac{\\min(510-503,\\ 503-490)}{3(3)} = \\dfrac{\\min(7,13)}{9} = \\dfrac{7}{9} \\approx \\) <strong>0.78</strong>.</p>
          <p>\\(C_{pk} < C_p\\) because the process is off-center (503, not the midpoint 500) — \\(C_{pk}\\) correctly penalizes that, while \\(C_p\\) does not.</p>`
      },
      {
        key: "D",
        text: "(0.78, 0.78)",
        correct: false,
        hint: "\\(C_p\\) doesn't depend on where the process mean sits — only on the specification width relative to \\(6\\sigma\\). Recompute \\(C_p\\) from \\((USL-LSL)/(6\\sigma)\\) alone, without reference to the mean of 503."
      }
    ]
  }),

  Object.freeze({
    id: 9,
    kicker: "Quality management — hypothesis test on a proportion",
    title: "Electronics defect reduction",
    context: `<p>An electronics manufacturer historically has a 2% defective rate. After a process improvement, 8 of 500 sampled units are found defective.</p>`,
    question: "For a one-sided z-test of a lower defect rate at \\(\\alpha = 0.05\\), which conclusion is correct?",
    options: [
      {
        key: "A",
        text: "z = −0.64; insufficient evidence",
        correct: true,
        solution: `<p>Sample defect rate: \\(\\hat p = 8/500 = 0.016\\). Null rate: \\(p_0 = 0.02\\).</p>
          <p>\\[ z = \\frac{\\hat p - p_0}{\\sqrt{p_0(1-p_0)/n}} = \\frac{0.016-0.02}{\\sqrt{0.02(0.98)/500}} \\approx -0.64 \\]</p>
          <p>For a one-sided lower-tail test at \\(\\alpha=0.05\\), the critical value is \\(-1.645\\). Since \\(-0.64 > -1.645\\), the result doesn't fall in the rejection region — <strong>insufficient evidence</strong> of a significant improvement, even though the sample rate is numerically lower.</p>`
      },
      {
        key: "B",
        text: "z = −1.64; significant improvement",
        correct: false,
        hint: "This reuses the critical value (\\(-1.645\\)) as if it were the computed test statistic. The test statistic has to be calculated from the data itself: \\(z = (\\hat p - p_0)/\\sqrt{p_0(1-p_0)/n}\\), then compared against the critical value — not set equal to it."
      },
      {
        key: "C",
        text: "z = −0.64; significant improvement",
        correct: false,
        hint: "The z-value here is right, but the conclusion isn't. A negative z-score alone doesn't establish significance — it has to be compared against the critical value for \\(\\alpha=0.05\\) (\\(-1.645\\)); since \\(-0.64\\) isn't as extreme as \\(-1.645\\), it falls short of significance."
      },
      {
        key: "D",
        text: "z = −2.00; significant improvement",
        correct: false,
        hint: "This uses an arbitrary standard error rather than the one implied by the null hypothesis. For a one-sample proportion test, the standard error under \\(H_0\\) is \\(\\sqrt{p_0(1-p_0)/n}\\), using the hypothesized rate \\(p_0=0.02\\), not some other figure."
      }
    ]
  }),

  // ---- Aggregate production planning (Q10-Q14) ----
  Object.freeze({
    id: 10,
    kicker: "Aggregate planning — level strategy",
    title: "Electronics level plan",
    context: `<p>A consumer electronics firm forecasts monthly demand of 800, 1,200, and 1,000 units. Starting inventory is 200 units and the required final inventory is 100 units.</p>`,
    question: "Approximately what constant monthly production (to the nearest whole unit) achieves the target under a level plan?",
    options: [
      {
        key: "A",
        text: "1,000 units",
        correct: false,
        hint: "This is just the simple average of the three monthly demand figures (\\(3000/3\\)), ignoring the starting and required ending inventory. A level plan has to produce enough, in total, to also build up the required 100 units of ending inventory beyond the 200 already on hand."
      },
      {
        key: "B",
        text: "967 units",
        correct: true,
        solution: `<p>Total units needed = total demand + required ending inventory − starting inventory = \\(800+1200+1000+100-200 = 2900\\).</p>
          <p>Constant monthly production = \\(2900/3 \\approx 966.67 \\approx \\) <strong>967 units</strong>.</p>`
      },
      {
        key: "C",
        text: "900 units",
        correct: false,
        hint: "This subtracts both the starting inventory and the required ending inventory from total demand (as if ending inventory reduced the production need), when only the starting inventory should be subtracted — the required ending inventory should be added, since it still has to be produced."
      },
      {
        key: "D",
        text: "1,100 units",
        correct: false,
        hint: "This adds the starting inventory to total demand instead of subtracting it. Units already on hand reduce how much needs to be produced, so starting inventory belongs as a subtraction, not an addition."
      }
    ]
  }),

  Object.freeze({
    id: 11,
    kicker: "Aggregate planning — chase strategy",
    title: "Auto plant chase plan",
    context: `<p>An auto plant faces monthly demand of 900, 1,200, and 1,500 units. Each worker produces 100 units per month. The initial workforce is 9. Hiring costs Rs. 5,000 and firing costs Rs. 8,000 per worker.</p>`,
    question: "What is the total workforce adjustment cost under a chase plan?",
    options: [
      {
        key: "A",
        text: "Rs. 45,000",
        correct: false,
        hint: "This looks like it costs the full workforce at some point in the plan, rather than only the workers actually hired or fired at each transition. Track the required headcount month by month (9, 12, 15) and cost only the incremental changes between consecutive months."
      },
      {
        key: "B",
        text: "Rs. 30,000",
        correct: true,
        solution: `<p>Required workforce each month = demand ÷ output per worker: \\(900/100=9\\), \\(1200/100=12\\), \\(1500/100=15\\).</p>
          <p>Workforce path: 9 → 9 (no change) → 12 (hire 3) → 15 (hire 3). Total hires = 6, no firing needed since demand only rises.</p>
          <p>Cost = \\(6 \\times \\text{Rs. }5{,}000 = \\) <strong>Rs. 30,000</strong>.</p>`
      },
      {
        key: "C",
        text: "Rs. 48,000",
        correct: false,
        hint: "This assumes some firing happens in this plan, but demand rises every month here (900 → 1,200 → 1,500), so the required workforce only ever grows — there's no month where it needs to shrink, so the firing cost of Rs. 8,000/worker never applies."
      },
      {
        key: "D",
        text: "Rs. 60,000",
        correct: false,
        hint: "This overcounts the hires needed — recompute the required headcount for each month (900, 1,200, and 1,500 units at 100 units/worker gives 9, 12, and 15 workers) and count only the hires between consecutive months (9→12, then 12→15), not against the initial workforce twice."
      }
    ]
  }),

  Object.freeze({
    id: 12,
    kicker: "Aggregate planning — mixed capacity sources",
    title: "Garment overtime",
    context: `<p>A garment producer must make 2,400 units. Regular capacity is 2,000 units at Rs. 200/unit, overtime capacity is 300 units at Rs. 260/unit, and subcontracting costs Rs. 310/unit.</p>`,
    question: "What is the minimum total production cost?",
    options: [
      {
        key: "A",
        text: "Rs. 509,000",
        correct: true,
        solution: `<p>Use the cheapest sources first, in order of unit cost: regular (Rs. 200), then overtime (Rs. 260), then subcontracting (Rs. 310).</p>
          <p>Regular: \\(2000 \\times 200 = \\) Rs. 400,000. Overtime (full capacity): \\(300 \\times 260 = \\) Rs. 78,000. Remaining \\(2400-2000-300=100\\) units via subcontracting: \\(100 \\times 310 = \\) Rs. 31,000.</p>
          <p>Total = \\(400{,}000+78{,}000+31{,}000 = \\) <strong>Rs. 509,000</strong>.</p>`
      },
      {
        key: "B",
        text: "Rs. 524,000",
        correct: false,
        hint: "This misallocates units across the three sources — double-check that all 2,000 units of regular capacity and all 300 units of overtime capacity are used in full before any units go to the more expensive subcontracting option."
      },
      {
        key: "C",
        text: "Rs. 540,000",
        correct: false,
        hint: "This doesn't use the least expensive sources first — regular capacity (Rs. 200/unit) should be filled completely before overtime (Rs. 260/unit), and overtime completely before subcontracting (Rs. 310/unit), since each is progressively more expensive per unit."
      },
      {
        key: "D",
        text: "Rs. 478,000",
        correct: false,
        hint: "This only costs 2,300 of the 2,400 units needed (regular plus overtime), leaving out the remaining 100 units that still have to come from somewhere — in this case, subcontracting at Rs. 310/unit."
      }
    ]
  }),

  Object.freeze({
    id: 13,
    kicker: "Aggregate planning — level output with inventory",
    title: "FMCG level output",
    context: `<p>An FMCG company faces demand of 1,000, 1,400, and 800 units. It produces 1,200 units each month, starting with zero inventory. Holding cost is Rs. 20 per unit of positive month-end inventory; backlog costs Rs. 50 per unit of negative month-end inventory.</p>`,
    question: "What is the total cost over the three months?",
    options: [
      {
        key: "A",
        text: "Rs. 12,000",
        correct: true,
        solution: `<p>Track ending inventory month by month, starting from 0: Month 1: \\(0+1200-1000=200\\). Month 2: \\(200+1200-1400=0\\). Month 3: \\(0+1200-800=400\\).</p>
          <p>All three month-end balances are non-negative, so there's no backlog. Holding cost = \\((200+0+400) \\times 20 = \\) <strong>Rs. 12,000</strong>.</p>`
      },
      {
        key: "B",
        text: "Rs. 4,000",
        correct: false,
        hint: "This only costs the final month's ending inventory (400 units), skipping month 1's ending balance of 200 units. Holding cost accrues in every month that ends with positive inventory, not just the last one."
      },
      {
        key: "C",
        text: "Rs. 8,000",
        correct: false,
        hint: "This double-counts or omits one month's ending inventory. Recompute the running balance month by month — starting at 0, adding 1,200 produced and subtracting that month's demand each time — rather than netting the three months' demand against total production in one step."
      },
      {
        key: "D",
        text: "Rs. 16,000",
        correct: false,
        hint: "There's no backlog in this plan — every month's ending inventory stays at or above zero (200, 0, 400), so the Rs. 50/unit backlog cost never applies. Only the Rs. 20/unit holding cost on the positive balances should enter the total."
      }
    ]
  }),

  Object.freeze({
    id: 14,
    kicker: "Aggregate planning — comparing capacity options",
    title: "Furniture temporary workers",
    context: `<p>A furniture company needs 1,500 units. Regular capacity is 1,000 units at Rs. 400/unit. Overtime capacity is 300 units at Rs. 520/unit. Subcontracting costs Rs. 600/unit. Each temporary worker costs Rs. 15,000 fixed and can produce 100 units at Rs. 400/unit; at most 3 workers may be hired.</p>`,
    question: "Which plan is least costly?",
    options: [
      {
        key: "A",
        text: "Regular 1,000 + overtime 300 + subcontract 200",
        correct: false,
        hint: "Subcontracting (Rs. 600/unit) is the most expensive source here. Before reaching for it, compare its cost against using a temporary worker instead: a temp costs Rs. 15,000 fixed plus Rs. 400/unit for 100 units — Rs. 550/unit effectively — which is cheaper than subcontracting's flat Rs. 600/unit."
      },
      {
        key: "B",
        text: "Regular 1,000 + 2 temps (200) + overtime 300",
        correct: true,
        solution: `<p>Compare the effective per-unit cost of each source beyond regular capacity: overtime is Rs. 520/unit; a temporary worker costs Rs. 15,000 fixed to produce 100 units at Rs. 400/unit, i.e. Rs. \\((15{,}000+40{,}000)/100 = \\) Rs. 550/unit; subcontracting is Rs. 600/unit.</p>
          <p>Overtime (Rs. 520/unit) is cheapest, so use all 300 units of it. The remaining \\(1500-1000-300=200\\) units are cheaper from temps (Rs. 550/unit) than from subcontracting (Rs. 600/unit), so hire 2 temps for 200 units.</p>
          <p>Total = \\(1000(400) + 300(520) + 2(15{,}000+40{,}000) = 400{,}000+156{,}000+110{,}000 = \\) <strong>Rs. 666,000</strong> — the least costly of the four plans.</p>`
      },
      {
        key: "C",
        text: "Regular 1,000 + 3 temps (300) + overtime 200",
        correct: false,
        hint: "This uses overtime (Rs. 520/unit, the cheapest source beyond regular capacity) for only part of its available capacity while putting more expensive temp labor (Rs. 550/unit) ahead of it. Exhaust the cheaper source — overtime — fully before turning to temps."
      },
      {
        key: "D",
        text: "Regular 1,000 + 3 temps (300) + subcontract 200",
        correct: false,
        hint: "This skips overtime (Rs. 520/unit) entirely in favor of temps and subcontracting, both of which cost more per unit (Rs. 550 and Rs. 600 respectively). Overtime is the cheapest capacity beyond regular production and should be used before either of those."
      }
    ]
  })
]);

// ---- Rendering + interaction state ----

let pqpCurrentIndex = 0;
let pqpResolved = []; // per-question: true once the correct option has been chosen
let pqpQuestionViewedAt = 0; // timestamp when the current question was rendered, for timing analytics

function pqpEscapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function pqpRenderProgress() {
  const track = document.getElementById("pqp-progress-track");
  if (!track) return;
  track.innerHTML = PQP_CHALLENGE_QUESTIONS.map((q, i) => {
    const state = pqpResolved[i] ? "done" : i === pqpCurrentIndex ? "current" : "todo";
    return `<span class="om-progress-dot om-progress-${state}" aria-hidden="true"></span>`;
  }).join("");
  const label = document.getElementById("pqp-progress-label");
  if (label) {
    const solvedCount = pqpResolved.filter(Boolean).length;
    label.textContent = `Question ${pqpCurrentIndex + 1} of ${PQP_CHALLENGE_QUESTIONS.length} · ${solvedCount} solved`;
  }
}

function pqpRenderEmptyState() {
  const panel = document.getElementById("pqp-question-panel");
  if (!panel) return;
  panel.innerHTML = `
    <span class="game-kicker">Coming soon</span>
    <h2>Questions are being added</h2>
    <p>This challenge is being set up. Check back shortly, or try one of the other challenges in the meantime.</p>
  `;
  const track = document.getElementById("pqp-progress-track");
  if (track) track.innerHTML = "";
  const label = document.getElementById("pqp-progress-label");
  if (label) label.textContent = "No questions yet";
}

function pqpRenderQuestion() {
  const question = PQP_CHALLENGE_QUESTIONS[pqpCurrentIndex];
  const panel = document.getElementById("pqp-question-panel");
  if (!panel || !question) return;

  pqpQuestionViewedAt = Date.now();
  if (typeof window.logChallengeEvent === "function") {
    window.logChallengeEvent({
      challenge: "periodic-review-quality-planning",
      question_id: question.id,
      event_type: "view"
    });
  }

  panel.innerHTML = `
    <span class="game-kicker">${pqpEscapeHTML(question.kicker)}</span>
    <h2 id="pqp-question-title">${pqpEscapeHTML(question.title)}</h2>
    <div class="om-context">${question.context}</div>
    <p class="om-question-prompt">${pqpEscapeHTML(question.question)}</p>
    <div class="om-options" id="pqp-options" role="radiogroup" aria-labelledby="pqp-question-title"></div>
    <div class="om-feedback" id="pqp-feedback" aria-live="polite"></div>
    <div class="om-nav-row">
      <button type="button" class="game-secondary-btn" id="pqp-prev-btn">&larr; Previous question</button>
      <button type="button" class="game-primary-btn" id="pqp-next-btn" hidden>Next question <span aria-hidden="true">&rarr;</span></button>
    </div>
  `;

  const optionsWrap = document.getElementById("pqp-options");
  const alreadyResolved = pqpResolved[pqpCurrentIndex];

  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "om-option";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", "false");
    btn.dataset.key = option.key;
    btn.innerHTML = `<span class="om-option-key">${option.key}</span><span class="om-option-text">${pqpEscapeHTML(option.text)}</span>`;
    if (alreadyResolved && option.correct) {
      btn.classList.add("om-option-correct");
    }
    btn.addEventListener("click", () => pqpHandleAnswer(question, option, btn));
    optionsWrap.appendChild(btn);
  });

  if (alreadyResolved) {
    const correctOption = question.options.find(o => o.correct);
    pqpShowFeedback(correctOption, true);
  }

  document.getElementById("pqp-prev-btn").disabled = pqpCurrentIndex === 0;
  document.getElementById("pqp-prev-btn").addEventListener("click", () => {
    if (pqpCurrentIndex > 0) { pqpCurrentIndex--; pqpRenderQuestion(); pqpRenderProgress(); }
  });

  const nextBtn = document.getElementById("pqp-next-btn");
  if (alreadyResolved) nextBtn.hidden = false;
  nextBtn.addEventListener("click", pqpGoToNext);

  pqpRenderProgress();
  renderMath(panel);
}

function pqpHandleAnswer(question, option, button) {
  const optionsWrap = document.getElementById("pqp-options");
  optionsWrap.querySelectorAll(".om-option").forEach(el => el.setAttribute("aria-checked", "false"));
  button.setAttribute("aria-checked", "true");

  if (typeof window.logChallengeEvent === "function") {
    window.logChallengeEvent({
      challenge: "periodic-review-quality-planning",
      question_id: question.id,
      event_type: "answer_attempt",
      option_key: option.key,
      correct: option.correct,
      time_spent_ms: Date.now() - pqpQuestionViewedAt
    });
  }

  if (option.correct) {
    pqpResolved[pqpCurrentIndex] = true;
    optionsWrap.querySelectorAll(".om-option").forEach(el => {
      el.disabled = true;
      if (el.dataset.key === option.key) el.classList.add("om-option-correct");
    });
    document.getElementById("pqp-next-btn").hidden = false;
  } else {
    button.classList.add("om-option-wrong");
    window.setTimeout(() => button.classList.remove("om-option-wrong"), 600);
  }

  pqpShowFeedback(option, option.correct);
  pqpRenderProgress();
}

function pqpShowFeedback(option, isCorrect) {
  const feedback = document.getElementById("pqp-feedback");
  if (!feedback) return;
  if (isCorrect) {
    feedback.innerHTML = `<div class="om-feedback-box om-feedback-correct">
      <span class="om-feedback-label">Correct</span>
      ${option.solution}
    </div>`;
  } else {
    feedback.innerHTML = `<div class="om-feedback-box om-feedback-hint">
      <span class="om-feedback-label">Hint</span>
      <p>${option.hint}</p>
    </div>`;
  }
  renderMath(feedback);
}

function pqpGoToNext() {
  if (pqpCurrentIndex < PQP_CHALLENGE_QUESTIONS.length - 1) {
    pqpCurrentIndex++;
    pqpRenderQuestion();
  } else {
    pqpRenderSummary();
  }
}

function pqpRenderSummary() {
  const panel = document.getElementById("pqp-question-panel");
  if (!panel) return;
  const solved = pqpResolved.filter(Boolean).length;
  panel.innerHTML = `
    <span class="game-kicker">Challenge complete</span>
    <h2>You worked through all ${PQP_CHALLENGE_QUESTIONS.length} problems</h2>
    <p>${solved} of ${PQP_CHALLENGE_QUESTIONS.length} were answered correctly during this pass. Revisit any question from the progress trail above, or start over.</p>
    <div class="om-nav-row">
      <button type="button" class="game-secondary-btn" id="pqp-review-btn">&larr; Review questions</button>
      <button type="button" class="game-primary-btn" id="pqp-restart-btn">Start over</button>
    </div>
  `;
  document.getElementById("pqp-review-btn").addEventListener("click", () => {
    pqpCurrentIndex = 0; pqpRenderQuestion();
  });
  document.getElementById("pqp-restart-btn").addEventListener("click", () => {
    pqpCurrentIndex = 0;
    pqpResolved = PQP_CHALLENGE_QUESTIONS.map(() => false);
    pqpRenderQuestion();
  });
}

function initPQPChallenge() {
  const panel = document.getElementById("pqp-question-panel");
  if (!panel) return;

  if (PQP_CHALLENGE_QUESTIONS.length === 0) {
    pqpRenderEmptyState();
    return;
  }

  pqpResolved = PQP_CHALLENGE_QUESTIONS.map(() => false);

  const params = new URLSearchParams(window.location.search);
  const requestedId = parseInt(params.get("q"), 10);
  const foundIndex = PQP_CHALLENGE_QUESTIONS.findIndex(q => q.id === requestedId);
  pqpCurrentIndex = foundIndex >= 0 ? foundIndex : 0;

  pqpRenderQuestion();
}
