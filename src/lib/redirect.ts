import NextContextWithApollo from '../interfaces/NextContextWithApollo'

const redirect: Function = (
  url: string,
  ctx?: NextContextWithApollo | null
) => {
  if (ctx && ctx.res) {
    ctx.res.writeHead(302, { Location: url })
    ctx.res.end()
  } else {
    document.location.pathname = url
  }
}

export default redirect
