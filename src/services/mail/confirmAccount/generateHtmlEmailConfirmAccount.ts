type Props = {
  token: string
  link: string
  companyName: string
}
export const generateHtmlEmailConfirmAccount = ({
  token,
  link,
  companyName
}: Props): string => {
  const style = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }
  .banner {
    height: 50px;
    background-color: #782ef1;
    padding: 3.5rem 0rem;
    margin: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
  .banner h1 {
    text-align: center;
    font-size: 3.5rem;
    font-weight: 800;
    line-height: normal;
    color: #fff;
  }
  .container {
    width: 100vw;
    display: flex;
    flex-direction: column;
    padding: 0rem 2rem;
    justify-content: center;
  }

  .paragraph {
    font-size: 1.5rem;
    color: #333;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .paragraph span {
    font-weight: 900;
    color: #782ef1;
  }

  .paragraph a {
    color: #040ceb;
  }

  @media (width<400px) {
    .container {
      padding: 0 1rem;
    }
    .banner {
      padding: 3rem 0;
    }
    .banner h1 {
      font-size: 2rem;
    }
    .paragraph {
      font-size: 1.2rem;
    }
  }
`

  return `
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      ${style}
    </style>
  </head>
  <div>
    <div class="container">
      <div class="banner">
        <h1>Welcome !</h1>
      </div>
      <p class="paragraph">
        <strong>Olá</strong>,<br/>
        Sua conta na <span>${companyName}</span> foi criada com
        sucesso!
      </p>
      <p class="paragraph">Agora você pode aproveitar todos os recursos.</p>
      <p class="paragraph">
        Para ativar sua conta,
        <a href=${link + `/auth/confirm?token=${token}`}>clique aqui.</a>
      </p>
      <p class="paragraph">
        Se você não solicitou esta conta, ignore este e-mail.
      </p>
      <p class="paragraph">
        Obrigado por escolher a
        <span >${companyName}!</span>
      </p>
      <p class="paragraph"> Atenciosamente, A Equipe da
      <span >${companyName}</span>
      </p>
    </div>
  </div>

`
}
