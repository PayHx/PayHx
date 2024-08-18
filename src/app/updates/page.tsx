export default function SubmitSalaryPage() {
    const currentDate = new Date().toLocaleDateString();

    return (
        <div>
            <article className="w-3/4 mt-10 mx-auto bg-outline">
                <div className="header-content mb-5 font-american-typewriter">
                    <p>Today&apos;s date: {currentDate}</p>
                    <p className="mb-8">This will be updated as changes are made to the site.</p>
                    <p>[8/17/24] 5 reports submitted</p>
                    <p>- Med surg nursing salary Tempe Arizona (YOE: 8, $55.00/hr) </p>
                    <p>- Cardiac nursing salary Phoenix, Arizona (YOE: 3, $55.00/hr)</p>
                    <p>- Pediatric nursing salary Phoenix, Arizona (YOE: 3, $35.60/hr)</p>
                    <p>- ICU nursing salary Roseville, California (YOE: 7, $75.00/hr)</p>
                    <p>- OR nursing salary Oakland, California (YOE: 6.5, $92.00/hr)</p>
                    <p>[8/12/24] 5 reports submitted (California x3, Arizona, Florida)</p>
                    <p>[8/7/24] 3 reports submitted (Washington, Oregon, California)</p>
                    <p>[8/4/24] 4 reports submitted (Colorado, Nevada, California x2)</p>
                    <p>[7/28/24] 5 reports submitted (Alabama, California x4, New York). First update 🎉</p>
                    <p>[7/8/24] PayHx is now under the domain name payhx.live!</p>
                </div>
            </article>
        </div>
    );
  }