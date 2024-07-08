export default function SubmitSalaryPage() {
    const currentDate = new Date().toLocaleDateString();

    return (
        <div>
            <article className="w-3/4 mt-10 mx-auto bg-outline">
                <div className="header-content mb-5 font-american-typewriter">
                    <p>Today&apos;s date: {currentDate}</p>
                    <p className="mb-8">This will be updated as changes are made to the site.</p>
                    <p>[7/8/24] PayHx is now under the domain name payhx.live!</p>
                </div>
            </article>
        </div>
    );
  }