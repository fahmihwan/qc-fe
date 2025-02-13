import { IconBanjirSVG, IconBencanaSVG, IconFoodEstateSVG, IconGempaSVG, IconJagungSVG, IconKedelaiSVG, IconPadiSVG, IconPerumahanRakyatSVG, IconSingkongSVG, IconSurveySVG, IconTebuSVG } from "../view/component/IconSvg"
import { IconDashboardSVG } from "../view/component/IconSvg"

const menu = [
    {
        title: 'Dashboard',
        link: '/dashboard',
        icon: (<IconDashboardSVG />),
        submenu: null,

    },
    {
        title: 'Food Estate',
        link: null,
        icon: <IconFoodEstateSVG />,
        submenu: [
            {
                title: 'Semua Kategori',
                link: '/all-food-estate',
                icon: <IconDashboardSVG />
            },
            {
                title: 'Padi',
                link: '/padi',
                icon: <IconPadiSVG />
            },
            {
                title: 'Jagung',
                link: '/jagung',
                icon: <IconJagungSVG />
            },
            {
                title: 'Singkong',
                link: '/singkong',
                icon: <IconSingkongSVG />
            },
            {
                title: 'Kedelai',
                link: '/kedelai',
                icon: <IconKedelaiSVG />
            },
            {
                title: 'Tebu',
                link: '/tebu',
                icon: <IconTebuSVG />
            }
        ],
    },
    {
        title: 'Bencana',
        link: null,
        icon: <IconBencanaSVG />,
        submenu: [
            {
                title: 'Semua Kategori',
                link: '/all-bencana',
                icon: <IconDashboardSVG />
            },
            {
                title: 'Gempa',
                link: '/gempa',
                icon: <IconGempaSVG />
            },
            // {
            //     title: 'Banjir',
            //     link: '',
            //     icon: <IconBanjirSVG />
            // },
        ],
    },
    {
        title: 'Perumahan Rakyat',
        link: null,
        icon: <IconPerumahanRakyatSVG />,
    },
    {
        title: 'Survey',
        link: null,
        icon: <IconSurveySVG />,
    }
]

export default menu