## ¿Qué es este package?

Este es el package oficial del McBot que es el bot oficial del servidor de pol mcfly(invite.gg/polmcfly)

## Instalación

```
npm install mcbot --save
```

## Usos:

__Load:__

```
const mcbot = require('mcbot')

mcbot.load({
    prefix: "!",
    token: "Tu_Token",
    Color_Base: "#00d6ff",
    Color_Success: "#01CF00",
    Color_Warn: "#01CF00",
    Color_Error: "#FBDD00",
})
```