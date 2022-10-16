import { Spinner } from "@chakra-ui/react";

interface LoaderProps {
  show: boolean;
}
export default function Loader({ show }: LoaderProps) {
  return show ? <Spinner /> : null;
}
