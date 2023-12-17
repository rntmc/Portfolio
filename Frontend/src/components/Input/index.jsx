import { Container} from "./styles";

export function Input({icon: Icon, ...rest}){ //converte o icon para maiusculo
  return(
    <Container>
      {Icon && <Icon size={20}/>} 
      <input {...rest} />
    </Container>
  )
}