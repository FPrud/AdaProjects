import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>AdaProjects</title>
      </head>
      <body>
        <header id="homeTitle" className="pl-5 pr-5 text-center">
          <div>
            <h1>AdaProjects</h1>
            <h3>Les projets des élèves d'Ada Tech School</h3>
          </div>
        </header>

        {children}

        <footer>
          <p className="pl-5 pr-5 text-center">Site réalisé dans le cadre du projet Adaverse, proposé par Ada Tech School (2025)</p>
        </footer>
      </body>
    </html>
  );
}