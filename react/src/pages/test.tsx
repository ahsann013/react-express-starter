import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/theme/mode-toogle'
import Helpers from '@/config/helpers'

const Test = () => {
    

    
    return (
    <div>
      <Button onClick={() => Helpers.showToast("Hello, No", "success")}>Click me</Button>
      <ModeToggle />
    </div>
  )
}

export default Test
