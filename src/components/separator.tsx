import Link from "next/link";

export function MainSeparator() {
  return (
    <div>
      {/* Right-aligned header block */}
      <div className="text-right space-y-1 font-american-typewriter">
        <h4 className="text-xl font-bold font-medium leading-none">PayHx</h4>
        <p className="text-sm text-muted-foreground">
          Real Salaries, Real People.
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex h-5 items-center space-x-4 text-xl font-american-typewriter">
        <Link href="/updates">Updates</Link>
        <Link href="/about-us">About Us</Link>
        <Link href="/mekko-test">Mekko Test</Link>
        <Link href="/submit-salary">Submit Salary</Link>
      </div>
    </div>
  );
}
