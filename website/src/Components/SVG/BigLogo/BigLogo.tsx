import { useAppContext } from "src/hooks"
import { Props } from "@lukasbriza/lbui-lib"
import React, { useEffect, useState } from "react"
import { BigLogoProps } from "./_types"

export const BigLogo = React.forwardRef<SVGPathElement, BigLogoProps & Props<SVGSVGElement>>((props, ref) => {
    const [logoScale, setLogoScale] = useState<number>(props.scale ? props.scale : 0.7)
    const { breakPoint } = useAppContext()

    useEffect(() => {
        switch (breakPoint) {
            case "fromMobile":
                setLogoScale(0.5)
                break;
            default:
                setLogoScale(0.7)
        }
    }, [breakPoint])

    useEffect(() => {
        if (props.scale) {
            setLogoScale(props.scale)
        }
    }, [props.scale])

    return (
        <svg
            {...props}
            viewBox="0 0 300 332"
            width={300 * logoScale}
            height={332 * logoScale}
            xmlns="http://www.w3.org/2000/svg"
        >

            <mask id="path-1-inside-1" fill="white">
                <path d="M180.816 331.044C183.502 326.356 186.244 321.744 188.895 317.286V317.281C194.956 307.088 200.681 297.461 205.631 287.237C214.252 269.848 217.03 250.141 213.552 231.046C212.32 224.369 214.701 220.406 218.941 216.176C238.341 196.85 252.228 176.57 261.391 154.176C268.713 136.254 270.391 120.426 266.511 105.786C264.931 99.808 262.172 94.1961 259.251 88.2541C257.926 85.5541 256.551 82.771 255.281 79.906C259.808 82.2651 264.095 85.0586 268.081 88.247C272.066 91.4352 275.731 95.003 279.026 98.9001C283.498 103.984 287.347 109.584 290.491 115.58C293.452 121.279 295.733 127.306 297.286 133.537C298.819 139.759 299.703 146.122 299.926 152.526C300.147 159.134 299.813 165.748 298.926 172.3C297.797 180.92 296.152 189.464 294 197.886C291.933 205.942 289.361 213.859 286.3 221.592C283.318 229.105 279.859 236.42 275.945 243.492C272.07 250.478 267.761 257.215 263.045 263.663C258.307 270.13 253.189 276.311 247.719 282.173C242.155 288.132 236.269 293.783 230.088 299.1C223.918 304.412 217.245 309.595 210.253 314.5C203.382 319.323 196.008 324.018 188.336 328.456C186.735 329.265 185.045 329.884 183.3 330.3C182.486 330.53 181.645 330.768 180.821 331.043L180.816 331.044ZM111.287 304.844C108.186 304.83 105.098 304.43 102.096 303.652C94.2337 301.673 86.4883 299.255 78.896 296.411C71.4419 293.613 64.1963 290.288 57.214 286.461C50.2598 282.638 43.6436 278.229 37.437 273.284C31.0906 268.205 25.2367 262.539 19.953 256.362C15.5432 251.228 11.7382 245.603 8.61298 239.6C5.67695 233.911 3.45993 227.879 2.01298 221.643C0.586094 215.384 -0.0873485 208.976 0.00698758 202.557C0.122753 195.772 0.940099 189.017 2.44598 182.4C7.61898 199.582 20.121 210.567 40.665 215.98C58.21 220.593 76.286 224.39 93.765 228.062C99.816 229.333 106.074 230.648 112.234 231.98C117.759 233.027 123.143 234.716 128.275 237.014C133.387 239.365 137.756 243.076 140.904 247.74C143.079 250.931 144.692 254.471 145.674 258.206C146.525 261.589 146.783 265.095 146.437 268.566C145.827 274.877 143.364 281.476 138.904 288.74C136.005 293.626 131.935 297.714 127.06 300.632C122.278 303.432 116.828 304.888 111.287 304.847V304.844ZM111.018 200.479H111.011C102.121 200.469 93.2471 199.702 84.487 198.185C75.2992 196.579 66.2561 194.233 57.446 191.171C51.3112 189.184 45.5245 186.251 40.295 182.478C37.7425 180.576 35.422 178.381 33.381 175.938C31.2534 173.367 29.4731 170.527 28.086 167.492C25.9191 162.838 24.6079 157.832 24.215 152.714C23.8662 147.724 24.4339 142.713 25.89 137.928C27.4687 132.822 29.8523 128.001 32.951 123.646C36.4621 118.718 40.5904 114.26 45.235 110.382C46.398 109.387 47.522 108.398 48.825 107.252H48.83C50.192 106.052 51.737 104.694 53.605 103.086C52.349 102.033 51.13 101.086 49.952 100.16C47.8627 98.6096 45.8855 96.9138 44.035 95.0851C39.1267 90.0258 35.3819 83.9562 33.062 77.3C30.9606 71.2125 30.3133 64.7176 31.172 58.3351C32.0631 51.8283 34.4738 45.6229 38.209 40.221C42.3324 34.2845 47.6943 29.3128 53.925 25.649C61.2645 21.2274 68.8942 17.3066 76.762 13.9131C84.4736 10.5968 92.4051 7.81746 100.5 5.595C108.578 3.38683 116.797 1.7323 125.1 0.642977C133.535 -0.456077 142.033 -1.00485 150.54 -0.999968C153.094 -0.999968 155.7 -0.950948 158.285 -0.854948C165.12 -0.705103 171.866 0.735823 178.166 3.392C183.595 5.71218 188.391 9.29686 192.153 13.847C195.834 18.4169 198.371 23.7994 199.553 29.547C200.879 36.1669 200.938 42.9781 199.728 49.62C199.045 53.698 198.369 57.7341 197.618 62.2701C203.154 63.0593 208.572 64.5283 213.748 66.644C218.821 68.7499 223.358 71.9637 227.028 76.05C232.516 82.0768 236.293 89.4616 237.968 97.4391C239.449 105.293 239.149 113.378 237.088 121.1C231.051 145.4 218.001 163.563 198.298 175.1C191.427 179.142 184.329 182.787 177.04 186.016C170.006 189.126 162.781 191.782 155.407 193.967C148.193 196.097 140.84 197.722 133.4 198.829C125.99 199.924 118.509 200.477 111.018 200.482V200.479ZM149.666 103.39C140.777 103.52 132.3 107.157 126.081 113.51C120.145 119.29 116.731 127.179 116.581 135.462C116.661 153.7 130.408 166.592 150.011 166.813H150.496C169.02 166.813 182.523 154.191 182.602 136.8H182.692C182.804 128.036 179.437 119.586 173.33 113.3C167.185 107.048 158.812 103.488 150.046 103.4L149.666 103.39ZM149.535 28.4211C124.91 28.4211 100.579 34.457 77.216 46.362C76.7967 46.5754 76.3723 46.79 75.943 47.006C68.843 50.588 60.798 54.647 61.016 63.982C61.237 73.531 69.498 78.5401 76.785 82.9601L77.595 83.4521C79.456 84.4594 81.544 84.9733 83.66 84.945C84.8899 84.9735 86.1133 84.7587 87.26 84.313C109.678 74.5129 133.26 67.63 157.43 63.833C159.407 63.4108 161.28 62.5992 162.94 61.4456C164.601 60.2921 166.015 58.8196 167.1 57.114C168.9 53.714 169.6 49.633 170.108 46.652C170.298 45.543 170.462 44.587 170.651 43.804H170.691C170.815 38.191 170.066 34.6691 168.26 32.3871C166.47 30.1261 163.56 28.987 158.831 28.703C155.742 28.518 152.613 28.424 149.535 28.424V28.4211Z" />
            </mask>
            <path
                ref={ref}
                fill="transparent"
                d="M180.816 331.044C183.502 326.356 186.244 321.744 188.895 317.286V317.281C194.956 307.088 200.681 297.461 205.631 287.237C214.252 269.848 217.03 250.141 213.552 231.046C212.32 224.369 214.701 220.406 218.941 216.176C238.341 196.85 252.228 176.57 261.391 154.176C268.713 136.254 270.391 120.426 266.511 105.786C264.931 99.808 262.172 94.1961 259.251 88.2541C257.926 85.5541 256.551 82.771 255.281 79.906C259.808 82.2651 264.095 85.0586 268.081 88.247C272.066 91.4352 275.731 95.003 279.026 98.9001C283.498 103.984 287.347 109.584 290.491 115.58C293.452 121.279 295.733 127.306 297.286 133.537C298.819 139.759 299.703 146.122 299.926 152.526C300.147 159.134 299.813 165.748 298.926 172.3C297.797 180.92 296.152 189.464 294 197.886C291.933 205.942 289.361 213.859 286.3 221.592C283.318 229.105 279.859 236.42 275.945 243.492C272.07 250.478 267.761 257.215 263.045 263.663C258.307 270.13 253.189 276.311 247.719 282.173C242.155 288.132 236.269 293.783 230.088 299.1C223.918 304.412 217.245 309.595 210.253 314.5C203.382 319.323 196.008 324.018 188.336 328.456C186.735 329.265 185.045 329.884 183.3 330.3C182.486 330.53 181.645 330.768 180.821 331.043L180.816 331.044ZM111.287 304.844C108.186 304.83 105.098 304.43 102.096 303.652C94.2337 301.673 86.4883 299.255 78.896 296.411C71.4419 293.613 64.1963 290.288 57.214 286.461C50.2598 282.638 43.6436 278.229 37.437 273.284C31.0906 268.205 25.2367 262.539 19.953 256.362C15.5432 251.228 11.7382 245.603 8.61298 239.6C5.67695 233.911 3.45993 227.879 2.01298 221.643C0.586094 215.384 -0.0873485 208.976 0.00698758 202.557C0.122753 195.772 0.940099 189.017 2.44598 182.4C7.61898 199.582 20.121 210.567 40.665 215.98C58.21 220.593 76.286 224.39 93.765 228.062C99.816 229.333 106.074 230.648 112.234 231.98C117.759 233.027 123.143 234.716 128.275 237.014C133.387 239.365 137.756 243.076 140.904 247.74C143.079 250.931 144.692 254.471 145.674 258.206C146.525 261.589 146.783 265.095 146.437 268.566C145.827 274.877 143.364 281.476 138.904 288.74C136.005 293.626 131.935 297.714 127.06 300.632C122.278 303.432 116.828 304.888 111.287 304.847V304.844ZM111.018 200.479H111.011C102.121 200.469 93.2471 199.702 84.487 198.185C75.2992 196.579 66.2561 194.233 57.446 191.171C51.3112 189.184 45.5245 186.251 40.295 182.478C37.7425 180.576 35.422 178.381 33.381 175.938C31.2534 173.367 29.4731 170.527 28.086 167.492C25.9191 162.838 24.6079 157.832 24.215 152.714C23.8662 147.724 24.4339 142.713 25.89 137.928C27.4687 132.822 29.8523 128.001 32.951 123.646C36.4621 118.718 40.5904 114.26 45.235 110.382C46.398 109.387 47.522 108.398 48.825 107.252H48.83C50.192 106.052 51.737 104.694 53.605 103.086C52.349 102.033 51.13 101.086 49.952 100.16C47.8627 98.6096 45.8855 96.9138 44.035 95.0851C39.1267 90.0258 35.3819 83.9562 33.062 77.3C30.9606 71.2125 30.3133 64.7176 31.172 58.3351C32.0631 51.8283 34.4738 45.6229 38.209 40.221C42.3324 34.2845 47.6943 29.3128 53.925 25.649C61.2645 21.2274 68.8942 17.3066 76.762 13.9131C84.4736 10.5968 92.4051 7.81746 100.5 5.595C108.578 3.38683 116.797 1.7323 125.1 0.642977C133.535 -0.456077 142.033 -1.00485 150.54 -0.999968C153.094 -0.999968 155.7 -0.950948 158.285 -0.854948C165.12 -0.705103 171.866 0.735823 178.166 3.392C183.595 5.71218 188.391 9.29686 192.153 13.847C195.834 18.4169 198.371 23.7994 199.553 29.547C200.879 36.1669 200.938 42.9781 199.728 49.62C199.045 53.698 198.369 57.7341 197.618 62.2701C203.154 63.0593 208.572 64.5283 213.748 66.644C218.821 68.7499 223.358 71.9637 227.028 76.05C232.516 82.0768 236.293 89.4616 237.968 97.4391C239.449 105.293 239.149 113.378 237.088 121.1C231.051 145.4 218.001 163.563 198.298 175.1C191.427 179.142 184.329 182.787 177.04 186.016C170.006 189.126 162.781 191.782 155.407 193.967C148.193 196.097 140.84 197.722 133.4 198.829C125.99 199.924 118.509 200.477 111.018 200.482V200.479ZM149.666 103.39C140.777 103.52 132.3 107.157 126.081 113.51C120.145 119.29 116.731 127.179 116.581 135.462C116.661 153.7 130.408 166.592 150.011 166.813H150.496C169.02 166.813 182.523 154.191 182.602 136.8H182.692C182.804 128.036 179.437 119.586 173.33 113.3C167.185 107.048 158.812 103.488 150.046 103.4L149.666 103.39ZM149.535 28.4211C124.91 28.4211 100.579 34.457 77.216 46.362C76.7967 46.5754 76.3723 46.79 75.943 47.006C68.843 50.588 60.798 54.647 61.016 63.982C61.237 73.531 69.498 78.5401 76.785 82.9601L77.595 83.4521C79.456 84.4594 81.544 84.9733 83.66 84.945C84.8899 84.9735 86.1133 84.7587 87.26 84.313C109.678 74.5129 133.26 67.63 157.43 63.833C159.407 63.4108 161.28 62.5992 162.94 61.4456C164.601 60.2921 166.015 58.8196 167.1 57.114C168.9 53.714 169.6 49.633 170.108 46.652C170.298 45.543 170.462 44.587 170.651 43.804H170.691C170.815 38.191 170.066 34.6691 168.26 32.3871C166.47 30.1261 163.56 28.987 158.831 28.703C155.742 28.518 152.613 28.424 149.535 28.424V28.4211Z"
                stroke="white"
                strokeWidth={props.strokeWidth ? props.strokeWidth : 5}
                mask="url(#path-1-inside-1)"
            />
        </svg>
    )
})