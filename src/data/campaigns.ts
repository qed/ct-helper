import { recipients, Recipient } from './recipients'

export interface Campaign {
  id: string
  title: string
  description: string
  issueSummary: string
  talkingPoints: string[]
  recipients: Recipient[]
  templateLetter: string
  lettersSent: number
  level: 'municipal' | 'provincial' | 'federal'
  status: 'active' | 'completed' | 'draft'
  image?: string
}

export const campaigns: Campaign[] = [
  {
    id: '1',
    title: 'Fund Emergency Shelter Beds',
    description: 'Toronto needs more emergency shelter beds to address the growing homelessness crisis. Urge City Council to increase funding for shelter services.',
    issueSummary: `Toronto is facing an unprecedented homelessness crisis. Every night, thousands of people sleep rough on our streets while shelters operate at over 100% capacity. The city's current shelter system cannot meet demand, leaving vulnerable residents without safe places to sleep.

The 2024 winter season saw record cold-related deaths among homeless populations. Despite this, the city's shelter expansion plans have stalled due to budget constraints. We need immediate action to fund additional emergency beds and improve existing shelter conditions.`,
    talkingPoints: [
      'Toronto shelters are consistently over capacity, turning away hundreds of people nightly',
      'The city has promised 1,000 new shelter beds but has only delivered 300',
      'Investing in shelters saves money on emergency services and healthcare',
      'Every person deserves a safe, warm place to sleep'
    ],
    recipients: recipients.filter(r => r.level === 'municipal'),
    templateLetter: `Dear [RECIPIENT],

I am writing to urge you to prioritize funding for emergency shelter beds in Toronto's upcoming budget.

As a resident of this city, I am deeply concerned about the growing number of our neighbours who are forced to sleep on the streets each night. Our current shelter system is operating far beyond capacity, and people are being turned away from the warmth and safety they desperately need.

The facts are stark:
- Toronto shelters are consistently over 100% capacity
- Hundreds of people are turned away from shelters every night
- The promised 1,000 new beds have not materialized

I urge you to:
1. Allocate additional funding for emergency shelter operations
2. Expedite the opening of promised new shelter locations
3. Support long-term housing solutions to address root causes

Every person in our city deserves a safe place to sleep. I look forward to seeing leadership on this critical issue.

Sincerely,
[YOUR NAME]`,
    lettersSent: 89,
    level: 'municipal',
    status: 'active'
  },
  {
    id: '2',
    title: 'Expand ODSP Benefits',
    description: 'Ontario Disability Support Program rates are far below the poverty line. Call on the provincial government to increase ODSP to livable levels.',
    issueSummary: `The Ontario Disability Support Program (ODSP) provides financial assistance to Ontarians with disabilities, but current rates leave recipients in deep poverty. A single person on ODSP receives approximately $1,308 per month – well below the poverty line and barely enough to cover rent, let alone food, transportation, and other necessities.

The recent 6.5% increase, while welcome, does not make up for decades of rate freezes and inflation. Many ODSP recipients are forced to choose between paying rent and eating, leading to worsening health outcomes and increased homelessness among disabled Ontarians.`,
    talkingPoints: [
      'ODSP rates are 40% below the poverty line',
      'The average rent in Toronto exceeds the entire ODSP shelter allowance',
      'Disabled Ontarians deserve to live with dignity, not in poverty',
      'Doubling ODSP would cost less than 0.5% of the provincial budget'
    ],
    recipients: recipients.filter(r => r.level === 'provincial'),
    templateLetter: `Dear [RECIPIENT],

I am writing to urge the Ontario government to significantly increase Ontario Disability Support Program (ODSP) benefits to ensure disabled Ontarians can live with dignity.

Current ODSP rates of approximately $1,308/month for a single person are simply not enough to survive in Ontario. With average rents exceeding $1,500 in most cities, ODSP recipients cannot afford both housing and food. This is unacceptable in a province as wealthy as Ontario.

I am calling on you to:
1. Double ODSP rates immediately to bring them above the poverty line
2. Index ODSP to inflation to prevent future erosion of benefits
3. Increase the earnings exemption so people can work without losing benefits

Disabled Ontarians are not asking for luxury – they are asking for the basic means to survive. Ontario can and must do better.

Sincerely,
[YOUR NAME]`,
    lettersSent: 124,
    level: 'provincial',
    status: 'active'
  },
  {
    id: '3',
    title: 'National Housing Strategy',
    description: 'Canada needs bold federal action on affordable housing. Demand the government accelerate the National Housing Strategy and increase social housing investment.',
    issueSummary: `Canada is in the midst of a housing affordability crisis that affects millions of people. The federal government's National Housing Strategy, while a step in the right direction, has been too slow to deliver the affordable housing units our country desperately needs.

Since 2017, housing prices have increased by over 50% while wages have stagnated. The waitlist for social housing in major cities stretches years, and nearly 1 in 5 Canadians spends more than 30% of their income on housing. We need the federal government to treat housing as a human right and invest accordingly.`,
    talkingPoints: [
      'Over 1.5 million Canadian households are in core housing need',
      'The National Housing Strategy has delivered only a fraction of promised units',
      'Housing prices have increased 50% since 2017',
      'Canada builds far fewer social housing units per capita than comparable countries'
    ],
    recipients: recipients.filter(r => r.level === 'federal'),
    templateLetter: `Dear [RECIPIENT],

I am writing to urge the federal government to accelerate and expand the National Housing Strategy to address Canada's housing crisis.

Housing in Canada has become increasingly unaffordable for millions of Canadians. Rents are skyrocketing, home ownership is a distant dream for most young people, and waitlists for social housing stretch for years. The current pace of the National Housing Strategy is simply not meeting the scale of the crisis.

I call on you to:
1. Double the investment in the National Housing Strategy
2. Fast-track the construction of social and co-op housing units
3. Implement stronger measures to prevent speculation and vacancy
4. Work with provinces to ensure housing remains affordable

Housing is a human right, and the federal government must lead with bold action. Canadians cannot wait any longer.

Sincerely,
[YOUR NAME]`,
    lettersSent: 34,
    level: 'federal',
    status: 'active'
  }
]
