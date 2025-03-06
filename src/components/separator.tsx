import { Separator } from "@/components/ui/separator"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function MainSeparator() {
    return (
        <div>
          <div className="space-y-1 font-american-typewriter">
            <h4 className="text-xl font-bold font-underline font-medium leading-none">PayHx</h4>
            <p className="text-sm text-muted-foreground">
              Real Salaries, Real People.
            </p>
          </div>
          <Separator className="my-4"/>
          <div className="flex h-5 items-center space-x-4 text-xl font-american-typewriter">
            <Link href="/updates">
                <Button variant="link">
                    Updates
                </Button>
            </Link>
            <Separator orientation="vertical" />
            <Link href="/about-us">
                <Button variant="link">
                    About Us
                </Button>
            </Link>
            <Separator orientation="vertical" />
            <Link href="/submit-salary">
                <Button variant="link">
                    Submit Salary
                </Button>
            </Link>
            <Separator orientation="vertical" />
            <Link href="/visualizations">
                <Button variant="link">
                    Visualizations
                </Button>
            </Link>
          </div>
        </div>
      )
}