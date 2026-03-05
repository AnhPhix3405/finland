import { Button } from "../ui/button"
// import "./investment-banner.css"
export default function InvestmentBanner() {
    return (
        <div className="px-2">
            <div
                className="w-full h-35 bg-center bg-cover mt-1 px-2 pt-2 relative rounded-md"
                style={{
                    backgroundImage:
                        'url("https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                }}
            >
                <h3 className="text-[14px] text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis enim, facilisis a metus ac, lacinia bibendum ligula. Integer elementum sed felis sit amet finibus.</h3>
                <Button variant={'ghost'} className="bg-green-400 absolute bottom-1 left-1/2 -translate-x-1/2">
                    <img src="/svgs/facebook-brands-solid.svg" alt=""
                        className="w-5 h-5 block" />
                    <span className="text-white font-bold">TOI QUAN TAM</span>
                </Button>
            </div>
        </div>
    )
}