import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ct-navy/95 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-ct-gold rounded-lg flex items-center justify-center">
                <span className="font-bold text-ct-navy text-sm">CT</span>
              </div>
              <span className="font-bold text-lg">Common Table</span>
            </div>
            <p className="text-white text-opacity-80 text-sm">
              Building community, sharing meals, creating change in Toronto's downtown core.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white text-opacity-80">
              <li>
                <a href="#" className="hover:text-ct-gold transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-ct-gold transition-colors">Our Programs</a>
              </li>
              <li>
                <a href="#" className="hover:text-ct-gold transition-colors">Get Involved</a>
              </li>
              <li>
                <a href="#" className="hover:text-ct-gold transition-colors">Donate</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-white text-opacity-80">
              <li>Bloor Street West</li>
              <li>Toronto, ON</li>
              <li>
                <a href="mailto:info@commontable.ca" className="hover:text-ct-gold transition-colors">
                  info@commontable.ca
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white border-opacity-20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white text-opacity-60">
            © {new Date().getFullYear()} Common Table. All rights reserved.
          </p>
          <p className="text-sm text-white text-opacity-60 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-ct-gold" /> in Toronto
          </p>
        </div>
      </div>
    </footer>
  )
}
