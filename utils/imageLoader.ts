import { ImageLoaderProps } from "next/image";

const imageLoader = ({ src, width, quality }: ImageLoaderProps) =>
  `${src}?w=${width}&q=${quality || 75}`;

export default imageLoader;
