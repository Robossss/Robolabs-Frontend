export interface profileInterface {
    name:string
    img:string
    description:string
    }
    export const profiles:profileInterface[] = [
        {
            name:"Beginners",
            img: "/profile1.png",
            description: "Get Started with  programming our robots online with little or no experience"
        },
        {
            name:"Intermediates",
            img: "/profile2.png",
            description: "With the little knowledge you have, we can help you polish your skills to make you industry ready"
        },
        {
            name:"Professionals",
            img: "/profile3.png",
            description: "Expand your knowledge by using our platform to make and simulate your prototypes "
        },
    ]