import { Link } from 'react-router-dom'
import { ArrowRight, Megaphone, Users, BarChart3, Heart } from 'lucide-react'
import { campaigns } from '../data/campaigns'
import PageContainer from '../components/layout/PageContainer'
import Button from '../components/ui/Button'
import CampaignCard from '../components/letter-writer/CampaignCard'

export default function Home() {
  const featuredCampaign = campaigns[0]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-ct-navy/90 text-white py-16 md:py-24">
        <PageContainer>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Voice Can Create{' '}
              <span className="text-ct-gold">Real Change</span>
            </h1>
            <p className="text-xl text-white text-opacity-90 mb-8">
              CT Helper empowers community members to advocate for affordable housing,
              social services, and dignity for all. Write to elected officials,
              track your impact, and join a movement for change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/campaigns">
                <Button variant="accent" size="lg">
                  Take Action Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ct-navy">
                  Staff Login
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Featured Campaign */}
      <section className="py-12 md:py-16 bg-white/95">
        <PageContainer>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-ct-navy">
              Featured Campaign
            </h2>
            <Link
              to="/campaigns"
              className="text-ct-teal font-medium hover:underline flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <CampaignCard campaign={featuredCampaign} />
            </div>
            <div className="bg-gray-100 rounded-xl p-6">
              <h3 className="font-bold text-ct-navy mb-4">Why This Matters</h3>
              <p className="text-gray-700 mb-4">
                {featuredCampaign.issueSummary.split('\n\n')[0]}
              </p>
              <Link to={`/campaigns/${featuredCampaign.id}`}>
                <Button variant="secondary">
                  Learn More & Write a Letter
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-white/95">
        <PageContainer>
          <h2 className="text-2xl md:text-3xl font-bold text-ct-navy text-center mb-12">
            How CT Helper Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-ct-teal bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Megaphone className="w-8 h-8 text-ct-teal" />
              </div>
              <h3 className="font-bold text-ct-navy mb-2">Choose a Campaign</h3>
              <p className="text-gray-600">
                Browse active campaigns targeting municipal, provincial, or federal issues affecting our community.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-ct-gold bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-ct-clay" />
              </div>
              <h3 className="font-bold text-ct-navy mb-2">Write Your Letter</h3>
              <p className="text-gray-600">
                Use our templates or write your own message to elected officials. Your voice matters!
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-ct-moss bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-ct-moss" />
              </div>
              <h3 className="font-bold text-ct-navy mb-2">Track Impact</h3>
              <p className="text-gray-600">
                See how many letters have been sent and the collective impact of our community's advocacy.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-ct-navy/90 text-white">
        <PageContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-ct-gold mb-2">247</div>
              <div className="text-white text-opacity-80">Letters Sent</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-ct-gold mb-2">89</div>
              <div className="text-white text-opacity-80">Supporters</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-ct-gold mb-2">3</div>
              <div className="text-white text-opacity-80">Active Campaigns</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-ct-gold mb-2">3</div>
              <div className="text-white text-opacity-80">Levels of Government</div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-white/95">
        <PageContainer>
          <div className="bg-ct-teal/90 rounded-2xl p-8 md:p-12 text-center text-white">
            <Heart className="w-12 h-12 mx-auto mb-4 text-ct-gold" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-white text-opacity-90 mb-6 max-w-2xl mx-auto">
              Join hundreds of community members who are using their voices to advocate
              for affordable housing, social services, and a more just society.
            </p>
            <Link to="/campaigns">
              <Button variant="accent" size="lg">
                Start Advocating Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </PageContainer>
      </section>
    </div>
  )
}
