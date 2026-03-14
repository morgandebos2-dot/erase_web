import Link from 'next/link';
import styles from './Wireframe.module.css';

const cards = [
  {
    title: 'Pixel Eraser',
    description: 'want to erase unpleasant parts of your image? Here you go !',
    link: '/erase',
    image: '/Eraser.png', // Use your eraser image here, e.g. '/eraser.png' if you have it
    bg: styles.cardBlue,
    imgClass: styles.eraserImg,
    descClass: styles.boldDesc,
  },
  {
    title: 'Drawing Tool',
    description: 'Create stunning artwork on your original imagewith this drawing tool.',
    link: '/drawing-tool',
    image: '/Pencil.png', // Use a landscape image, e.g. '/landscape.svg'
    bg: styles.cardYellow,
    imgClass: styles.landscapeImg,
    descClass: styles.boldDesc,
  },
  {
    title: 'Tool 3',
    description: 'text',
    link: '/about',
    image: '/landscape.svg', // Use a landscape image, e.g. '/landscape.svg'
    bg: styles.cardGreen,
    imgClass: styles.landscapeImg,
    descClass: styles.boldDesc,
  },
];

export default function HomeCards() {
  return (
    <div className={styles.homeGrid}>
      <div className={styles.topRow}>
        {cards.map((card) => (
          <Link href={card.link} key={card.title} className={styles.cardLinkWrap}>
            <div className={`${styles.cardBtn} ${card.bg}`} tabIndex={0} role="button" aria-label={card.title}>
              <img src={card.image} alt={card.title} className={card.imgClass} />
              <span className={styles.cardTitle}>{card.title}</span>
              <div className={`${styles.cardDesc} ${card.descClass}`}>{card.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
