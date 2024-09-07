export default function SubmitSalaryPage() {
    const currentDate = new Date().toLocaleDateString();

    return (
        <div>
            <article className="w-3/4 mt-10 mx-auto bg-outline">
                <div className="header-content mb-5 font-american-typewriter">
                Today&apos;s date: {currentDate}
                <br />
                This will be updated as changes are made to the site.
                <br /><br />
                [9/2/24] Inputs are now sortable & you can search by specialty🎉
                <br /><br />
               [8/28/24] 3 reports submitted
                <br />
                - Wound care nursing salary. Los Angeles, California (YOE: 2, $49.00/hr)
                <br />
                - Cardiac nursing salary. Manhattan, New York (YOE: 3, $45.00/hr)
                <br />
                - Pediatric nursing salary. Valhalla, New York (YOE: 1, $55.00/hr)
                <br /><br />
                [8/24/24] 1 report submitted
                <br />
                - Rehabilitation Nursing Salary. Lawrence, Kentucky (YOE: 2, $32.08/hr)
                <br /><br />
                [8/17/24] 5 reports submitted
                <br />
                - Med surg nursing salary. Tempe Arizona (YOE: 8, $55.00/hr)
                <br />
                - Cardiac nursing salary. Phoenix, Arizona (YOE: 3, $55.00/hr)
                <br />
                - Pediatric nursing salary. Phoenix, Arizona (YOE: 3, $35.60/hr)
                <br />
                - ICU nursing salary Roseville. California (YOE: 7, $75.00/hr)
                <br />
                - OR nursing salary Oakland. California (YOE: 6.5, $92.00/hr)
                <br /><br />
                [8/12/24] 5 reports submitted (California x3, Arizona, Florida)
                <br /><br />
                [8/7/24] 3 reports submitted (Washington, Oregon, California)
                <br /><br />
                [8/4/24] 4 reports submitted (Colorado, Nevada, California x2)
                <br /><br />
                [7/28/24] 5 reports submitted (Alabama, California x4, New York). First update 🎉
                <br /><br />
                [7/8/24] PayHx is now under the domain name payhx.live!
                </div>
            </article>
        </div>
    );
  }
