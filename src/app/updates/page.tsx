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
                [4/15/25] New Data Visual Added! Now you can compare accross state and specialty for the data points that we have!
                <br /><br />
                [3/21/25] 9 Salaries submitted! Late update but we have been working on something exciting to watch out!
                <br />
                - Hospice nursing salary. Denver, Colorado (YOE: 3, $44.23/hr, No differential)
                <br />
                - Med Surg nursing salary. Ardmore, Oklahoma (YOE: 2, $33.50/hr, No differential)
                <br />
                - ER nursing salary. Columbus, Mississippi (YOE: 3.5, $30.24/hr, No differential)
                <br />
                - L&D nursing salary. Franklin, Indiana (YOE: 7, $30.80/hr, $3.50/hr weekend differential)
                <br />
                - ER nursing salary. St. Augustine, Florida (YOE: 4, $38.53/hr, $3.00/hr night differential)
                <br />
                - ICU nursing salary. Louisville, Kentucky (YOE: 17, $48.00/hr, $4.00/hr night differential)
                <br />
                - CVICU nursing salary. Seattle, Washington (YOE: 3, $51.49/hr, No differential)
                <br />
                - L&D nursing salary. Jefferson City, Missouri (YOE: 2, $32.00/hr, No differential)
                <br />
                - Float Pool nursing salary. Nashville, Tennessee (YOE: 16, $49.00/hr, $5.00 Day differential)
                <br /><br />
                [3/9/25]
                <br />
                - Hospice nursing salary. Tacoma, Washington (YOE: 9, $70.00/hr, No differential). Hospital: NA. 
                <br />
                - Med Surg nursing salary. Summit, New Jersey (YOE: 1.5, $45.00/hr, $2.35/hr night differential) Hospital: Overlook Medical Center
                <br />
                - Telemetry/Cardiac nursing salary. Marina del Rey, California (YOE: 1, $48.11/hr, $3.50/hr weekend differential) Hospital: Ceders-Sinai MDR
                <br />
                - Hospice nursing salary. Denver, Colorado (YOE: 3, $44.23/hr, No differential) Hospital: NA
                <br /><br />
                [3/2/25]
                <br />
                Hey Everyone! We are attempting to map out all the entries we have so far and we are playing around with the scatter plot design. 
                <br />
                We have a lot of work to be done but we are moving a day at a time! Thank you for al your help and support. Feel free to reach out for any ideas, questions, or comments thanks!
                <br /><br />
                [2/25/25] 7 New Salaries Submitted 
                <br />
                - ER nursing salary. St. Petersburg, Florida (YOE: 1, $36.18/hr, No differential) Hospital: NA.  
                <br />
                - Med Surg nursing salary. Winter Haven, Florida (YOE: 5, $41.00/hr, Day shift PRN) Hospital: NA.  
                <br />
                - Med Surg nursing salary. Miami, Florida (YOE: 2, $35.00/hr, No differential) Hospital: NA.  
                <br />
                - ER nursing salary. Tampa, Florida (YOE: 5, $40.00/hr, $2.00/hr critical care differential) Hospital: NA.  
                <br />
                - L&D nursing salary. Tampa, Florida (YOE: 1, $32.00/hr, $2.50/hr night differential) Hospital: NA.  
                <br /><br />
                [2/16/25] 7 New Salaries Submitted 
                <br />
                ICU nursing salary. Los Angeles, California (YOE: 2, $56.00/hr, $6.00/hr night differential) Hospital: Null
                <br />
                ICU nursing salary. Los Angeles, California (YOE: 2, $59.00/hr, $4.50/hr night differential) Hospital: Dignity Health.
                <br />
                ER nursing salary. Montclair, California (YOE: 0, $41.00/hr, $4.00/hr night differential) Hospital: Montclair Hospital.
                <br />
                Telemetry/Cardiac nursing salary. Los Angeles, California (YOE: 1, $51.60/hr, $3.75/hr night differential) Hospital: NA.
                <br />
                CVICU nursing salary. Riverside, California (YOE: 0, $54.89/hr, $7.50/hr night differential) Hospital: NA.
                <br />
                Case Management nursing salary. Altadena, California (YOE: 7, $51.48/hr, No differential) Hospital: NA.
                <br />
                Float Pool nursing salary. Mission Viejo, California (YOE: 0, $45.00/hr, $6.50/hr night differential) Hospital: NA.
                <br />
                PCU nursing salary. Los Angeles, California (YOE: 1, $55.00/hr, Night shift) Hospital: NA.
                <br /><br />
                [2/6/25] 6 New Salaries Submitted 
                <br />
                - Neuro ICU nursing salary. Los Angeles, California (YOE: 1.5, $56.61/hr, $4.00/hr weekend differential) Hospital: NA.  
                <br />
                - Mental Health nursing salary. Orange, California (YOE: 3, $48.51/hr, No differential) Hospital: NA.  
                <br />
                - Emergency Department nursing salary. Oakland, California (YOE: 1, $68.38/hr, $17.00/hr night differential) Hospital: NA.  
                <br />
                - Medical Surgical nursing salary. La Jolla, California (YOE: 0, $57.00/hr, $7.00/hr night differential) Hospital: NA.  
                <br />
                - ICU nursing salary. Burbank, California (YOE: 0.5, $51.90/hr, $6.50/hr night differential) Hospital: NA.  
                <br />
                - Medical Surgical nursing salary. Beverly Hills, California (YOE: 5, $72.00/hr, $6.00/hr night differential) Hospital: NA.  
                <br /><br />
                [1/30/25] Bug Fix on the SUBMIT SALARY page. Submission was not allowed if user entered a SHIFT DIFF. All better now :)
                <br /><br />
                [1/27/25] 5 New Salaries Submitted 
                <br />
                - NICU nursing salary. Orange, California (YOE: 1, $41.00/hr, Nights, No differential) Hospital: NA.  
                <br />
                - Operating Room nursing salary. Los Angeles, California (YOE: 3, $65.57/hr, No differential) Hospital: NA.  
                <br />
                - NICU nursing salary. San Diego, California (YOE: 6.5, $74.00/hr, $4.50/hr night differential) Hospital: NA.  
                <br />
                - Float nursing salary. Fremont, California (YOE: 6, $85.00/hr, $6.00/hr float differential) Hospital: NA.  
                <br />
                - Surgical PCU nursing salary. Los Angeles, California (YOE: 1, $46.00/hr, $7.00/hr night differential) Hospital: NA. 
                <br /><br />
                [1/20/25] Site Update: Submit Salary page now includes appropriate number of fields.
                <br />
                - Specialty section consolidated to represent top 41 salaries submitted
                <br />
                - Added Zipcode section for added location accuracy
                <br /><br />
                [1/14/25] Announcement! Looking ER Nursing salaries in the Southern California Area. Help contribute now on the submit Tab :)
                <br />6 New Salaries Submitted! 
                <br />
                - Perioperative nursing salary. San Diego, California (YOE: 5, $60.10/hr, No differential) Hospital: NA.  
                <br />
                - Cardiac Catheterization Lab nursing salary. Reno, Nevada (YOE: 13, $52.00/hr, $7.00/hr On Call differential) Hospital: NA.
                <br />
                - Neonatal Intensive Care Unit nursing salary. Cincinnati, Ohio (YOE: 5, $40.00/hr, No differential) Hospital: NA.  
                <br />
                - Pre/Post-Operative nursing salary. Albany, New York (YOE: 10, $44.65/hr, No differential) Hospital: NA.  
                <br />
                - Psychiatric nursing salary. Long Island, New York (YOE: 1, $52.00/hr, No differential) Hospital: NA.  
                <br />
                - Telemetry/Cardiac nursing salary. Long Island, New York (YOE: 1, $52.00/hr, No differential) Hospital: NA.  	
                <br /><br />
                [1/6/2025] 6 New Salaries Submitted. Happy New Years 🥳!
                <br />
                - Labor and Delivery nursing salary. Tampa, Florida (YOE: 9, $44.00/hr, No differential) Hospital: NA.  
                <br />
                - Pre/Post-Operative nursing salary. Jacksonville, Florida (YOE: 6, $41.00/hr, No differential) Hospital: NA.  
                <br />
                - Perioperative nursing salary. Boston, Massachusetts (YOE: 3, $45.00/hr, No differential) Hospital: NA. 
                <br />
                - Intensive Care Unit nursing salary. Las Vegas, Nevada (YOE: 9, $49.63/hr, $2.10/hr night differential) Hospital: NA.
                <br />
                - Intensive Care Unit nursing salary. Denver, Colorado (YOE: 7, $44.00/hr, No differential) Hospital: NA.  
                <br />
                - Progressive Care Unit nursing salary. Houston, Texas (YOE: 1, $37.00/hr, No differential) Hospital: NA.  
                <br /><br />
                [12/31/2024]
                Hey all! Since we launched we&apos;ve had over 100 submissions, and I just wanted to say thank you all so much for your support in this project and mission! Wishing you all a Happy New Years. We have a lot in store for Payhx in the year to come :) - Matt and Oscar!
                <br /><br />
                [12/31/24] 5 Salaries Submitted
                <br />
                - Med Surg nursing salary. Salem, Oregon (YOE: 1, $48.00/hr, No differential) Hospital: NA.  
                <br />
                - Med Surg-Transplant nursing salary. New York City, New York (YOE: 1, $60.00/hr, No differential) Hospital: NA.  
                <br />
                - Long Term Acute Care nursing salary. Denver, Colorado (YOE: 1, $38.76/hr, $8.00/hr Extra Shift differential) Hospital: NA.  
                <br />
                - ICU nursing salary. New York City, New York (YOE: 2, $67.00/hr, No differential) Hospital: NA.  
                <br />
                - Primary Care nursing salary. Boston, Massachusetts (YOE: 2.5, $32.80/hr, No differential) Hospital: NA.  
                <br /><br />
                [12/23/24] 5 Reports Submitted
                <br />
                - Med Surg-Transplant nursing salary. New York City, New York (YOE: 1, $60.00/hr, No differential) Hospital: NA.  
                <br />
                - Long Term Acute Care nursing salary. Denver, Colorado (YOE: 1, $38.76/hr, $8.00/hr Extra Shift differential) Hospital: NA.  
                <br />
                - ICU nursing salary. New York City, New York (YOE: 2, $67.00/hr, No differential) Hospital: NA.  
                <br />
                - Primary Care nursing salary. Boston, Massachusetts (YOE: 2.5, $32.80/hr, No differential) Hospital: NA.  
                <br />
                - ER nursing salary. Charleston, South Carolina (YOE: 5, $36.51/hr, No differential) Hospital: NA.  
                <br /><br />
                [12/19/24] Site Update
                <br />
                Bug Fixed: Date column now sorts by actual date instead of alphabetically.
                <br /><br />
                [12/16/24] Site Update
                <br />
                Bug Fixed: Hospital affiliation will now show on the table if available. 
                <br /><br />
                [12/7/24] 4 Reports Submitted
                <br />
                - Med Surg nursing salary. Albany, New York (YOE: 10, $46.00/hr, $3.00/hr Per Diem differential) Hospital: NA.
                <br />
                - Peds nursing salary. Albany, New York (YOE: 1, $34.60/hr, $11.00/hr night differential) Hospital: NA.  
                <br />
                - CVICU nursing salary. Albany, New York (YOE: 0, $33.00/hr, $5.00/hr night/weekend differential) Hospital: NA. 
                <br />
                - Inpatient Psych nursing salary. Boston, Massachusetts (YOE: 1, $34.00/hr, No differential) Hospital: NA.  
                <br /><br />
                [12/2/24] 2 Reports submitted
                <br />
                - Cardiology nursing salary. Cleveland, Ohio (YOE: 5, $36.50/hr, $4.00/hr night differential) Hospital: NA.  
                <br />
                - ER nursing salary. Houston, Texas (YOE: 20, $60.00/hr, No differential) Hospital: NA.  
                <br /><br />
                [11/28/24] Update
                <br />
                Happy Thanksgiving! We are thankful for all the submissions so far! 🦃
                <br /><br />
                [11/25/24] 3 Reports submitted
                <br />
                - ED nursing salary. Stockbridge, Georgia (YOE: 1, $33.00/hr, $5.00/hr night differential) Hospital: NA.  
                <br />
                - Med Surg nursing salary. New York City, New York (YOE: 1, $57.00/hr, No differential) Hospital: NA.  
                <br />
                - Telemetry nursing salary. Baltimore, Maryland (YOE: 3, $38.00/hr, No differential) Hospital: NA.  
                <br /><br />
                [11/19/24] 9 Reports Submitted!
                <br />
                - Observation Unit nursing salary. Chicago, Illinois (YOE: 1, $36.00/hr, No differential) Hospital: NA.  
                <br />
                - Med Surg nursing salary. Chicago, Illinois (YOE: 1, $36.00/hr, No differential) Hospital: NA.  
                <br />
                - Rehabilitation nursing salary. Hampton Roads, Virginia (YOE: 1, $39.38/hr, No differential) Hospital: NA.  
                <br />
                - Critical Care nursing salary. Houston, Texas (YOE: 2, $42.00/hr, $4.00/hr night differential) Hospital: NA.  
                <br />
                - Med Surg nursing salary. Sarasota, Florida (YOE: 2, $29.44/hr, No differential) Hospital: NA.  
                <br />
                - ICU nursing salary. Sacramento, California (YOE: 1, $81.50/hr, No differential) Hospital: NA. 
                <br />
                - ER nursing salary. Philadelphia, Pennsylvania (YOE: 2, $47.10/hr, No differential) Hospital: NA.  
                <br />
                - Wound Care nursing salary. Atlanta, Georgia (YOE: 6, $43.00/hr, No differential) Hospital: NA.
                <br />
                - Med Surg nursing salary. Philadelphia, Pennsylvania (YOE: 6, $53.00/hr, No differential) Hospital: NA.  
                <br /><br />
                [11/10/24] 5 Reports submitted
                <br />
                - ER nursing salary. Dallas, Texas (YOE: 15, $50.00/hr, $5.00/hr night differential) Hospital: NA.
                <br />
                - IR/Cath nursing salary. Phoenix, Arizona (YOE: 3.5, $48.00/hr, No differential) Hospital: NA.
                <br />
                - OR nursing salary. Philadelphia, Pennsylvania (YOE: 4, $53.00/hr, No differential) Hospital: NA.
                <br />
                - Cardiothoracic Surgical nursing salary. Charlotte, North Carolina (YOE: 7, $43.00/hr, No differential) Hospital: NA.
                <br />
                - OR nursing salary. New Orleans, Louisiana (YOE: 23, $51.10/hr, No differential) Hospital: NA.
                 <br /><br />
                [11/2/24] Update
                <br />
                - We worked hard so now you can add Hospital Affiliation and Union Status! Thank you for the support so far everyone 🎉
                 <br /><br />
                [10/30/24] 5 Reports submitted
                <br />
               - Med Surg nursing salary. Charlotte, North Carolina (YOE: 4, $48.00/hr, No differential) Hospital: NA.
                 <br />
               - Float Pool nursing salary. Chicago, Illinois (YOE: 1, $43.00/hr, Nights) Hospital: NA.
                <br />
               - ER nursing salary. New York City, New York (YOE: 2, $66.00/hr, No differential) Hospital: NA.
                <br />
               - CVICU nursing salary. Honolulu, Hawaii (YOE: 26, $68.00/hr, No differential) Hospital: NA.
                <br />
               - PICU nursing salary. Dallas, Texas (YOE: 22, $55.25/hr, No differential) Hospital: NA.
                 <br /><br />
                [10/25/24] 3 Reports submitted
                 <br />
                - ICU nursing salary. Long Beach, California (YOE: 1, $51.00/hr, No differential)
                <br />
                - ER nursing salary. Oceanside, California (YOE: 2, $58.00/hr, No differential)
                <br />
                - ER nursing salary. Jacksonville, Florida (YOE: 1, $30.75/hr, No differential)
                <br /><br />
                [10/21/24] 2 salaries submitted
                 <br />
                - PACU nursing salary. New York City, New York (YOE: 5, $66.00/hr, No differential)
                 <br />
                - Cardiac ICU nursing salary. Palo Alto, California (YOE: 4.5, $105.00/hr, Day shift, No differential)
                <br /><br />
                [10/17/24] 3 salaries submitted
                <br />
                - ER nursing salary. Los Angeles, California (YOE: 1, $35.00/hr, No differential)
                <br />
                - NICU nursing salary. Fort Worth, Texas (YOE: 22, $60.00/hr, $5.00/hr night differential)
                <br />
                - L&D nursing salary. San Diego, California (YOE: 3, $64.00/hr, $7.00/hr night differential)
                <br /><br />
                [10/15/24] 3 salaries submitted
                <br />
                - ER nursing salary. Los Angeles, California (YOE: 1, $35.00/hr, No differential)
                <br />
                - NICU nursing salary. Fort Worth, Texas (YOE: 22, $60.00/hr, $5.00 night differential)
                <br />
                - L&D nursing salary. San Diego, California (YOE: 3, $64.00/hr, $7.00 night differential)
                <br /><br />
                [10/12/24] 2 salaries submitted
                <br />
                - ER nursing salary. Los Angeles, California (YOE: 0, $58.00/hr)
                <br />
                - IMU nursing salary. Houston, Texas (YOE: 3, $40.40/hr)
                <br /><br />
                [10/10/24]
                <br />
                Salaries can now be sorted by State or City in addition to Specialty. Try it out!
                <br /><br />
                [10/5/24] 3 Salaries submitted
                <br />
                - ICU nursing salary. Houston, Texas (YOE: 0, $31.50/hr, Days)
                <br />
                - Clinic Nurse salary. Oakland, California (YOE: 9, $95.00/hr, Days)
                <br />
                - Surgical nursing salary. Fountain Valley, California (YOE: 2, $55.00/hr, $5 shift diff for Nights)
                <br /><br />
                [10/2/24] 2 Salaries submitted
                <br />
                - L&D nursing salary. Los Gatos, California (YOE: 8, $103.00/hr)
                <br />
                - Operating Room nursing salary. Tucson, Arizona (YOE: 1, $26.00/hr)
                <br /><br />
                [9/27/24] 3 Salaries submitted
                <br />
                - Med Surg nursing salary. Denver, Colorado (YOE: 1, $34.00/hr)
                <br />
                - ICU nursing salary. Denver, Colorado (YOE: 8, $53.08/hr, $6.37 nights)
                <br />
                - Oncology nursing salary. Duarte, California (YOE: 1, $54.86/hr)
                <br /><br />
                [9/23/24] List expanded to show 100 entries
                <br /><br />
                [9/19/24] 2 Salaries submitted
                <br />
                - L&D nursing salary. Los Gatos, California (YOE: 8, $103.00/hr)
                <br />
                - Operating Room nursing salary. Tucson, Arizona (YOE: 1, $26.00/hr)
                <br /><br />
                [9/16/2024]
                <br />
                - Page numbers added to the master list.
                <br /><br />
                [9/13/24] 6 Salaries submitted
                <br />
                - ER nursing salary. New York City, New York (YOE: 5, $74.24/hr)
                <br />
                - ER nursing salary. Oceanside, New York (YOE: 2, $58.00/hr)
                <br />
                - ICU nursing salary. Pomona, California (YOE: 1, $46.00/hr, 5 weekends)
                <br />
                - PACU nursing salary. Bakersfield, California (YOE: 15, $52.00/hr)
                <br /><br />
                [9/9/24] 6 Salaries submitted
                <br />
                -Outpatient Pre-op nursing salary. Kansas City, Missouri (YOE: 6, $33.00/hr)
                <br />
                -NICU nursing salary. Jackson, Mississippi (YOE: 1, $27.00/hr, 3.05 nights)
                <br />
                -NICU nursing salary. Tupelo, Mississippi (YOE: 2.5, $29.92/hr)
                <br />
                -NICU nursing salary. Lincoln, California (YOE: 2, $38.00/hr, 5 nights/weekends)
                <br />
                -Neuro Stroke nursing salary. San Diego, California (YOE: 13, $49.00/hr, 4 nights)
                <br />
                -Telemetry nursing salary. Woodland Hills, California (YOE: 4, $74.00/hr)
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
