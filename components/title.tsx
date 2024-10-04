import styles from '../styles/style.module.css';


interface TitleProps {
    children: string;
}

const Title = (props: TitleProps) => {
    const { children } = props;

    return <h1 className={`${styles.fontColor} ${styles.headerContentH1} `}>{children}</h1>;
     
};

export default Title;