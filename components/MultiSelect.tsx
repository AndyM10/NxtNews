import { OptionBase, Select } from "chakra-react-select";

export interface multiSelectOpts extends OptionBase {
  label: string,
  value: string
}

interface multiSelectProps {
  opts: multiSelectOpts[]
}
export default function({ opts }: multiSelectProps): JSX.Element {
  return (
    <Select options={opts} isMulti />
  )
}
