const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 p-4 mt-12 ">
      <div className="container mx-auto md:flex justify-between">
        <aside className="lg:min-w-2xl md:min-w-sm flex items-center gap-x-4">
          <span className="text-5xl">📚</span>
          <p>
            <span className="text-2xl font-semibold">Library Management</span>
            <br />
            Providing book service since 1992
          </p>
        </aside>

        <div className="flex-1 flex justify-between gap-4 mt-6 md:mt-0">
          <nav className="flex flex-col">
            <h6 className="text-lg font-semibold mb-2">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav className="flex flex-col">
            <h6 className="text-lg font-semibold mb-2">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav className="flex flex-col">
            <h6 className="text-lg font-semibold mb-2">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
