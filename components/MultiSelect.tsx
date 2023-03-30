import { ChakraStylesConfig, OptionBase, Select, useChakraSelectProps } from "chakra-react-select";

export interface multiSelectOpts extends OptionBase {
  label: string,
  value: string
}

interface multiSelectProps {
  opts: multiSelectOpts[],
  onChange: (input: multiSelectOpts[]) => void
}

const chakraStyles: ChakraStylesConfig = {
  menuList: (provided) => ({
    ...provided,
    background: '#121212'
  })
}

export default function({ opts, onChange }: multiSelectProps): JSX.Element {
  const selectProps = useChakraSelectProps({ onChange, options: opts, isMulti: true, chakraStyles })
  return (
    <Select {...selectProps} />
  )
}
