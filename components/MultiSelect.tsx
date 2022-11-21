import { ChakraStylesConfig, OptionBase, Select } from "chakra-react-select";

export interface multiSelectOpts extends OptionBase {
  label: string,
  value: string
}

interface multiSelectProps {
  opts: multiSelectOpts[]
}

const chakraStyles: ChakraStylesConfig = {
  menuList: (provided) => ({
    ...provided,
    background: '#121212'
  })
}
export default function({ opts }: multiSelectProps): JSX.Element {
  return (
    <Select options={opts} isMulti chakraStyles={chakraStyles} />
  )
}
