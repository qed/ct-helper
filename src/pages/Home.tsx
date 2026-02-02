import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Users, Heart } from 'lucide-react'
import { campaigns } from '../data/campaigns'
import { Button } from '../components/ui/Button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

export default function Home() {
  const activeCampaigns = campaigns.filter((c) => c.status === 'active')
  const totalLettersSent = campaigns.reduce((sum, c) => sum + c.lettersSent, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <Badge className="bg-accent text-primary-hover border-none mb-6 px-4 py-1 text-sm">
            Advocacy & Outreach
          </Badge>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Amplify the Voices of
            <br />
            Our Community
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Help The Common Table advocate for meaningful change. Send a
            personalized letter to your elected officials in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/campaigns">
              <Button
                size="lg"
                className="bg-accent text-primary-hover hover:bg-white hover:text-primary font-bold"
              >
                Take Action Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#about">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {totalLettersSent}
              </div>
              <div className="text-text-secondary">Letters Sent</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                89
              </div>
              <div className="text-text-secondary">Supporters</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {activeCampaigns.length}
              </div>
              <div className="text-text-secondary">Active Campaigns</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                3
              </div>
              <div className="text-text-secondary">Levels of Government</div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Campaigns */}
      <section className="py-16 px-4 container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-primary mb-4">
            Current Campaigns
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Choose an issue below to lend your voice. Every letter counts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeCampaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="flex flex-col h-full hover:shadow-lg transition-shadow border-t-4 border-t-primary"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="mb-2 capitalize">
                    {campaign.level}
                  </Badge>
                  <span className="text-xs text-text-secondary font-medium">
                    {campaign.lettersSent} letters sent
                  </span>
                </div>
                <CardTitle className="text-xl mb-2">{campaign.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-text-secondary line-clamp-3 mb-4">
                  {campaign.description}
                </p>
                <div className="bg-background p-3 rounded-md text-sm text-text-secondary">
                  <span className="font-semibold text-primary">Target:</span>{' '}
                  {campaign.recipients[0]?.title || 'Elected Officials'}
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/campaigns/${campaign.id}`} className="w-full">
                  <Button fullWidth className="group">
                    Write Letter
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 px-4 border-y border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-text-secondary">
              Making advocacy radically simple.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <Heart size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">1. Choose a Cause</h3>
              <p className="text-text-secondary">
                Select a campaign that matters to you and our community.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <Users size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">2. Personalize Your Letter</h3>
              <p className="text-text-secondary">
                Use our template as a starting point and add your personal story.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <Mail size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">3. Review & Send</h3>
              <p className="text-text-secondary">
                We generate a personalized letter. You review it, click send,
                and make an impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 container mx-auto">
        <div className="bg-secondary rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="font-serif text-3xl font-bold mb-6 text-accent">
              About The Common Table
            </h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              The Common Table is a grassroots drop-in program operating out of
              the Church of the Redeemer. We serve 100 to 140 people daily with
              meals, clothing, basic healthcare, and community connection.
            </p>
            <p className="text-white/90 mb-8 leading-relaxed">
              CT Helper is our tool to bridge the gap between operations and
              advocacy, empowering our supporters to fight for systemic change.
            </p>
            <a
              href="https://theredeemer.ca/alt/get-involved-alternative/drop-in/"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-secondary"
              >
                Visit Our Main Website
              </Button>
            </a>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-video rounded-lg bg-black/20 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
                alt="Community meal"
                className="w-full h-full object-cover mix-blend-overlay opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/50 text-sm font-medium">
                  Community Photo Placeholder
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
