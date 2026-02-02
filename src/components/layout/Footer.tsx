export function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">
              The Common Table
            </h3>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              A grassroots drop-in program operating out of the Church of the
              Redeemer, serving meals and community to those in need.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent">Contact</h4>
            <address className="text-white/80 text-sm not-italic space-y-2">
              <p>162 Bloor Street West</p>
              <p>Toronto, ON M5S 1M4</p>
              <p>416-922-4948</p>
            </address>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent">CT Helper</h4>
            <p className="text-white/80 text-sm mb-4">
              An advocacy platform to amplify the voices of our community.
            </p>
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} The Common Table. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
