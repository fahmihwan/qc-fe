import { IconBanjirSVG, IconBencanaSVG, IconDataHasilSurveySVG, IconFoodEstateSVG, IconGempaSVG, IconJagungSVG, IconKedelaiSVG, IconPadiSVG, IconPerumahanRakyatSVG, IconSingkongSVG, IconSurveyDetailSVG, IconSurveySVG, IconTebuSVG } from "../view/component/IconSvg"
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
            {
                title: 'Pantauan dan Data Tabular',
                link: '/pantauan-dan-data-tabular',
                icon: <IconDashboardSVG />
            }
            // {
            //     title: 'Banjir',
            //     link: '',
            //     icon: <IconBanjirSVG />
            // },
        ],
    },
    {
        title: 'Perumahan Rakyat',
        link: '/perumahan-rakyat',
        icon: <IconPerumahanRakyatSVG />,
    },
    {
        title: 'Survey',
        link: null,
        icon: <IconSurveySVG />,
        submenu: [
            {
                title: 'QRcode',
                link: '/qrcode',
                icon: <IconGempaSVG />
            },
            {
                title: 'Data Hasil Survey',
                link: '/data-hasil-survey',
                icon: <IconDashboardSVG />
            },
            {
                title: 'Dashboard Survey',
                link: '/dashboard-hasil-survey',
                icon: <IconDashboardSVG />
            },
            {
                title: 'Other Dashboard Survey',
                link: '/other-dashboard-survey',
                icon: <IconDashboardSVG />
            },
        ],
    },

]

export default menu