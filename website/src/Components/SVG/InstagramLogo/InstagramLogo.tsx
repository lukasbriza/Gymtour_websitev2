import { FC } from "react"
import { InstagramLogoProps } from "./_types"

export const InstagramLogo: FC<InstagramLogoProps> = (props) => {
    const { fill, scale = 1 } = props
    const style = {
        transform: 'scale(' + scale + ')'
    }
    return (
        <svg style={style} width={24} height={24} {...props}>
            <defs>
                <radialGradient id="rg" r="150%" cx="30%" cy="107%">
                    <stop stopColor="#fdf497" offset="0" />
                    <stop stopColor="#fdf497" offset="0.05" />
                    <stop stopColor="#fd5949" offset="0.45" />
                    <stop stopColor="#d6249f" offset="0.6" />
                    <stop stopColor="#285AEB" offset="0.9" />
                </radialGradient>
            </defs>
            <path fill={fill ?? undefined} d="M15.233 5.488c-.843-.038-1.097-.046-3.233-.046s-2.389.008-3.232.046c-2.17.099-3.181 1.127-3.279 3.279-.039.844-.048 1.097-.048 3.233s.009 2.389.047 3.233c.099 2.148 1.106 3.18 3.279 3.279.843.038 1.097.047 3.233.047 2.137 0 2.39-.008 3.233-.046 2.17-.099 3.18-1.129 3.279-3.279.038-.844.046-1.097.046-3.233s-.008-2.389-.046-3.232c-.099-2.153-1.111-3.182-3.279-3.281zM12 16.108a4.108 4.108 0 1 1 0-8.215 4.108 4.108 0 0 1 0 8.215zm4.271-7.418a.96.96 0 1 1 0-1.92.96.96 0 0 1 0 1.92zM14.667 12a2.667 2.667 0 1 1-5.334 0 2.667 2.667 0 0 1 5.334 0zM19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zm.952 15.298c-.132 2.909-1.751 4.521-4.653 4.654-.854.039-1.126.048-3.299.048s-2.444-.009-3.298-.048c-2.908-.133-4.52-1.748-4.654-4.654C4.009 14.445 4 14.173 4 12c0-2.172.009-2.445.048-3.298.134-2.908 1.748-4.521 4.654-4.653C9.556 4.009 9.827 4 12 4s2.445.009 3.299.048c2.908.133 4.523 1.751 4.653 4.653.039.854.048 1.127.048 3.299 0 2.173-.009 2.445-.048 3.298z" />
        </svg>
    )
}

