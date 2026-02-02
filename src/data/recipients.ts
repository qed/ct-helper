export interface Recipient {
  id: string
  name: string
  title: string
  organization: string
  email: string
  level: 'municipal' | 'provincial' | 'federal'
}

export const recipients: Recipient[] = [
  {
    id: 'r1',
    name: 'Councillor Dianne Saxe',
    title: 'City Councillor',
    organization: 'Ward 11 - University-Rosedale',
    email: 'councillor_saxe@toronto.ca',
    level: 'municipal'
  },
  {
    id: 'r2',
    name: 'Mayor Olivia Chow',
    title: 'Mayor',
    organization: 'City of Toronto',
    email: 'mayor_chow@toronto.ca',
    level: 'municipal'
  },
  {
    id: 'r3',
    name: 'MPP Chris Glover',
    title: 'Member of Provincial Parliament',
    organization: 'Spadina-Fort York',
    email: 'cglover-qp@ndp.on.ca',
    level: 'provincial'
  },
  {
    id: 'r4',
    name: 'Minister Michael Parsa',
    title: 'Minister of Children, Community and Social Services',
    organization: 'Government of Ontario',
    email: 'minister.mccss@ontario.ca',
    level: 'provincial'
  },
  {
    id: 'r5',
    name: 'MP Kevin Vuong',
    title: 'Member of Parliament',
    organization: 'Spadina-Fort York',
    email: 'kevin.vuong@parl.gc.ca',
    level: 'federal'
  },
  {
    id: 'r6',
    name: 'Minister Sean Fraser',
    title: 'Minister of Housing, Infrastructure and Communities',
    organization: 'Government of Canada',
    email: 'sean.fraser@parl.gc.ca',
    level: 'federal'
  }
]
