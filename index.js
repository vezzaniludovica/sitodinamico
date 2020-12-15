const express= require("express")
const app= new express()

const renderMenu = (currentPage) =>{
    const selectedStyle= "color: red;"

return `
    <ul style="background-color:grey">
        <li><a href="/" style="${currentPage === "home" ? selectedStyle:""}">Home</a></li>
        <li><a href="/members" style="${currentPage === "members" ? selectedStyle: ""}">Members</a></li>
        <li><a href="/faq" style="${currentPage === "faq" ? selectedStyle: ""}">FAQ</a></li>
        <li><a href="/partners" style="${currentPage === "partners" ? selectedStyle: ""}">Partners</a></li>
    </ul>
`
}
const renderHtml = (currentPage, body) => {
    return ` 
    <!DOCTYPE html>
    <html>
      <head>
        <title>nulla snc</title>
      </head>
      <body style="background-color: #5AC3E6">
        ${renderMenu(currentPage)}
        ${body}
      </body>
    </html>
  `
  }
 
   
  app.get("/", (req, res) => {
    res.send(renderHtml("home", `<h1>This is the nulla snc homepage, welcome everyone</h1>
    <p>Nulla snc is a completely new enterprise with the aim of doing nothing but earning a lot.</p>
    `))
  })

  const members = [
    { 
      nome: "Bob Morse",
      email: "bm@nullasnc.com",
      ruolo: "CEO"
    },
    { 
      nome: "Jhon Brown",
      email: "jb@nullasnc.com",
      ruolo: "Artistic Director"
    },
    { 
      nome: "Tom Jones",
      email: "tj@nullasnc.com",
      ruolo: "Social Media Manager"
    }
  ]
   
  app.get("/members", (req, res) => {
    res.send(renderHtml("members", `<h1>this is the page of the main members of our team</h1>
    <ul>
      ${members.map((e => {
        return `
        <li>
          <div>
            <h3>${e.nome}</h3>
            <p>${e.email}</p>
            <p>${e.ruolo}</p>
          </div>
        </li>
        `})).join(" ")}
    </ul>`
    ))
  })
   
  const faq=[
    {domanda: "do you produce something?",
      risposta:"we don't produce anything but we make people think that we work a lot"},
      {domanda: "do you earn a lot?",
        risposta:" yes we earn a lot because people believe us and give us donations"},
      {domanda:"do you have an HQ?",
        risposta:"Yes, we have it even if we dont produce nothing we have officies"}
  ]

  app.get("/faq", (req,res)=>{
    res.send(renderHtml("faq", `
    <h1>in this page we answer the most frequent questions about us</h1>
    <ul>
    ${faq.map((e=>{
      return `
      <li>
      <div>
        <h3>${e.domanda}</h3>
        <p>${e.risposta}</p>
        </div>
        </li>`
    })).join(" ")}
    </ul>`))
  })
  app.set(express.static("\homework"));
  const partners=[
    {
      sponsor:"nike",
      img:"<img>nike.png</img>"
    },
    {
      sponsor:"jp morgan",
      img:"<img>jpmorgan.jpg</img>"
    },
    {
      sponsor:"mg investments",
      img:"<img>mginvestments.png</img>"
    }
  ]
  app.get("/partners", (req,res)=>{
    res.send(renderHtml("partners", `
    <h1>our main partners are:</h1>
    <table style="border:1px solid;
    width: 50%;">
    <tr>
    <th>sponsor</th>
    <th>logo</th>
    ${partners.map((e=>{
      return `
      <tr>
        <td>${e.sponsor}</td>
        <td>${e.img}</td>
      </tr>
   `
    })).join(" ")}
    </tr>
    </table>`))
  })

   
  app.listen(3000, () => console.log("server listening on port 3000"))