import {ImageCarousel} from "../components/ImageCarousel.tsx";

export function IndividualGame() {
    const items = [
        'https://img.freepik.com/premium-photo/retro-battleship-paper-game-as-battle-concept_681987-2783.jpg?w=826',
        'https://cdn.discordapp.com/attachments/1306721570122633317/1307301634770210877/Screenshot_2024-11-16_at_12.09.46.png?ex=6739cf06&is=67387d86&hm=01283906f71c99eac55324664f1f06640880caa69e8bf69b535892d4504eb7dd&',
        'https://bloob.io/img/meta/games/BATTLESHIP.png',
        'https://cdn.discordapp.com/attachments/1306721570122633317/1307301893491523674/Screenshot_2024-11-16_at_12.10.53.png?ex=6739cf43&is=67387dc3&hm=51edc2787e862ef4cd3e37d92186a8d9a4255c72d97838e35d1c8fe7a23d964c&'
    ]

    return (
        <div>
            <ImageCarousel images={items}/>
        </div>
    )
}


