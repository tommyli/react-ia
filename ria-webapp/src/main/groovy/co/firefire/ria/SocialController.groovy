package co.firefire.ria

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class SocialController {

  @GetMapping('/hello')
  public Collection<String> hello() {
    return ['hello', '你好']
  }
}
