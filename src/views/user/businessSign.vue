<template>
  <div>
    <loginHeader></loginHeader>
    <div class="base-box">
      <div class="steps">
        <el-steps :active="active" align-center :space="300" finish-status="success">
          <el-step title="注册账号"></el-step>
          <el-step title="填写企业资料"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
      <div v-if="$route.path === '/businessSign'" class="page1">
        <el-form label-position="right" label-width="100px" ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="registerForm.phone" name="phone" type="text" auto-complete="off" placeholder="输入手机号码" />
          </el-form-item>
          <el-form-item label="手机验证码" prop="code">
            <el-input v-model="registerForm.code" name="code" type="text" auto-complete="off" placeholder="输入短信验证码">
            </el-input>
            <div @click="sendCode" v-show="show" class="send-code">发送验证码</div>
            <div class="send-code" v-show="!show">{{ count }}秒后重发</div>
          </el-form-item>
          <el-form-item prop="password" label="设置密码">
            <el-input :type="passwordType" v-model="registerForm.password" name="password" auto-complete="off" placeholder="设置6到12位登录密码" />
          </el-form-item>
          <el-form-item label="重复密码" prop="passwordConfirm">
            <el-input :type="passwordType" @keyup.enter.native="handleRegister" v-model="registerForm.passwordConfirm" name="passwordConfirm" auto-complete="off" placeholder="请再次输入登录密码" />
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="button" @click.native.prevent="handleRegister" class="register-btn">立即注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <router-view v-else></router-view>
      <!-- <div class="page2">

      </div>
      <div class="page3">

      </div> -->
    </div>
    <el-dialog title="采购商用户服务协议" :visible.sync="dialogVisible" width="70%" :close-on-click-modal="false" :close-on-press-escape="false" @close="dialogClose">
      <div class="sign-dialog">
        <div class="red">特别提示</div>
        <div class="top-msg">
          你在使用吉林省旅游控股集团有限责任公司（以下简称“旅控”）提供的各项服务之前，请你务必审慎阅读、充分理解本协议各条款内容，特别是以粗体标注的部分，包括但不限于免除或者限制责任的条款。如你不同意本服务协议及/或随时对其的修改，你应立即停止注册；你一旦使用旅控提供的服务，即视为你已了解并完全同意本服务协议各项内容，包括旅控对服务协议所做的修改，并成为我们的用户。
        </div>
        <div class="title">一、服务条款的确认及接受</div>
        <div class="msg">
          1、吉好选网站（以下称“本网站”）的所有权和运作权归属于“吉好选”所有，本网站提供的服务将完全按照其发布的服务条款和操作规则严格执行。您确认所有服务条款并完成注册程序时，本协议在您与本网站间成立并发生法律效力，同时您成为本网站正式用户。
        </div>
        <br />
        <div class="important">
          2、根据国家法律法规变化及本网站运营需要，吉好选有权对本协议条款及相关规则不时地进行修改，修改后的内容一旦以任何形式公布在本网站上即生效，并取代此前相关内容，您应不时关注本网站公告、提示信息及协议、规则等相关内容的变动。您知悉并确认，如您不同意更新后的内容，应立即停止使用本网站；如您继续使用本网站，即视为知悉变动内容并同意接受。 </div>
        <div class="title">二、服务须知</div>
        <div class="important">
          1、本网站运用自身开发的操作系统通过国际互联网络为用户提供购买商品等服务。使用本网站，您必须： </div>
        <div class="msg">（1）自行配备上网的所需设备，包括个人手机、平板电脑、调制解调器、路由器等；</div>
        <div class="msg">（2）自行负担个人上网所支付的与此服务有关的电话费用、网络费用等；</div>
        <div class="msg">（3）选择与所安装终端设备相匹配的软件版本，包括但不限于iOS、Android、Windows等多个吉好选发布的应用版本。</div>
        <div class="important">
          2、基于本网站所提供的网络服务的重要性，您确认并同意：
        </div>
        <div class="msg">（1）提供的注册资料真实、准确、完整、合法有效，注册资料如有变动的，应及时更新；</div>
        <div class="msg">（2）如果您提供的注册资料不合法、不真实、不准确、不详尽的，您需承担因此引起的相应责任及后果，并且吉好选保留终止您使用本网站各项服务的权利。</div>
        <div class="title">三、订单</div>
        <div class="important">
          1、在您使用本网站下订单时，请您仔细确认所购商品的名称、价格、数量、型号、规格、尺寸、联系地址、电话、收货人等信息。收货人的行为和意思表示视为您的行为和意思表示，您应对收货人的行为及意思表示的法律后果承担连带责任。</div>
        <div class="important">
          2、您理解并同意：本网站上销售商展示的商品和价格等信息仅仅是要约邀请，您下单时须填写您希望购买的商品数量、价款及支付方式、收货人、联系方式、收货地址（履行地点）、履行方式等内容；系统生成的订单信息是计算机信息系统根据您填写的内容自动生成的数据，仅是您向销售商发出的要约；销售商收到您的订单信息后，只有在销售商将您在订单中订购的商品从仓库实际直接向您发出时（以商品出库为标志），方视为您与销售商之间就实际直接向您发出的商品建立了关系；如果您在一份订单里订购了多种商品并且销售商只给您发出了部分商品时，您与销售商之间仅就实际直接向您发出的商品建立了关系，只有在销售商实际直接向您发出了订单中订购的其他商品时，您和销售商之间就订单中其他已实际直接向您发出的商品才成立关系；对于电子书、数字音乐、在线手机充值等数字化商品，您下单并支付货款后即成立。</div>
        <div class="important">
          3、尽管销售商做出最大的努力，但由于市场变化及各种以合理商业努力难以控制因素的影响，本网站无法避免您提交的订单信息中的商品出现缺货、价格标示错误等情况；如您下单所购买的商品出现以上情况，您有权取消订单，销售商亦有权自行取消订单，若您已经付款，则为您办理退款。 </div>
        <div class="title">四、配送和交付</div>
        <div class="important">
          1、您在本网站购买的商品将按照本网站上您所指定的送货地址进行配送。订单信息中列出的送货时间为参考时间，参考时间的计算是根据库存状况、正常的处理过程和送货时间、送货地点的基础上估计得出的。您应当清楚准确地填写您的送货地址、联系人及联系方式等配送信息，您知悉并确认，您所购买的商品应仅由您填写的联系人接受身份查验后接收商品，因您变更联系人或相关配送信息而造成的损失由您自行承担。 </div>
        <div class="important">
          2、因如下情况造成订单延迟或无法配送等，本网站将无法承担迟延配送或无法配送的责任：
        </div>
        <span class="msg">
          （1）客户提供错误信息和不详细的地址；
        </span>
        <span class="msg">
          （2）货物送达无人签收或拒收，由此造成的重复配送所产生的费用及相关的后果。
        </span>
        <span class="msg">
          （3）不可抗力，例如：自然灾害及恶劣天气、交通戒严等政府、司法机关的行为、决定或命令、意外交通事故、罢工、法规政策的修改、恐怖事件、抢劫、抢夺等暴力犯罪、突发战争等。
        </span>
        <div class="important">
          3、销售商依您订单确定的收货信息配送至指定地点并向指定收货人交付，商品一经签收即视为交付，您应当场对商品品类、规格、型号、数量和包装等商品表面状况进行验收。您应及时收取货物，非因确实可证的质量问题不退换货。如您对商品质量有异议的，应于商品交付后及时内向销售商提出，销售商根据实际情况及时处理。</div>
        <div class="important">4、您在本网站购买的商品由第三方配送公司（包括顺丰、圆通等，以下称“配送公司”）为您完成订单交付的，系统或单据记录的签收时间为交付时间；您购买的商品采用在线传输方式交付的，销售商向您指定系统发送的时间为交付时间；您购买服务的，生成的电子或者实物凭证中载明的时间为交付时间。</div>
        <div class="title">五、售后服务</div>
        <span class="msg">
          销售商依据国家相关规定、厂家规定提供相关售后服务。
          <span class="important">您作为企业客户，非终端消费者，不适用“七天无理由退货”规则。</span>
        </span>
        <div class="title">六、结算方式</div>
        <div class="important">1、您在平台提交有效采购订单，结算方式应在平台提示的结算方式范围内自主选择。</div>
        <div class="title">七、违约责任</div>
        <div class="important">1、针对您的批量采购或定制商品需求，销售商开展备货行为后，如您未经销售商书面同意擅自取消采购需求或订单等违约行为，由此产生全部责任或损失均由您承担。</div>
        <div class="important">2、您应妥善保管本协议项下账户名及密码信息，如因为您擅自将账户名及密码信息转让、授权、赠与或因保管不善等任何其它原因导致任何其它人使用的，您需自行对其账户项下的一切行为独立承担责任。同时吉好选在该种情况下有权做出独立判断，可采取暂停或关闭您参与资格等措施。</div>
        <div class="important">3、您通过平台采购的商品不得销售给任何其他分销商或经销商，若产生与任何本协议外第三方的争议均由您自行解决，给吉好选造成实际损失的，您应承担相应赔偿责任。</div>
        <div class="important">4、如果吉好选发现或收到他人投诉举报您违反法律法规、违反本协议约定或存在任何恶意行为的，吉好选有权不经通知随时对相关内容进行删除、屏蔽，并视行为情节对违规帐号处以包括但不限于警告、限制或禁止使用部分或全部功能、帐号封禁、注销等处理，并公告处理结果。</div>
        <div class="important">5、除非另有明确的书面说明,吉好选不对本网站的运营及其包含在本网站上的信息、内容、材料、产品（包括软件）或服务作任何形式的、明示或默示的声明或担保（根据中华人民共和国法律另有规定的以外）。</div>
        <div class="title">八、所有权及知识产权</div>
        <div class="important">1、您一旦接受本协议，即表明您主动将您在任何时间段在本网站发表的任何形式的信息内容（包括但不限于客户评价、客户咨询、各类话题文章等信息内容）的财产性权利等任何可转让的权利，如著作权财产权（包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利），全部独家且不可撤销地转让给吉好选所有，并且您同意吉好选有权就任何主体侵权而单独提起诉讼。</div>
        <div class="important">2、本协议已经构成《中华人民共和国著作权法》第二十五条（条文序号依照2010年修订版《著作权法》确定）及相关法律规定的著作财产权等权利转让书面协议，其效力及于您在本网站上发布的任何受著作权法保护的作品内容，无论该等内容形成于本协议订立前还是本协议订立后。</div>
        <div class="important">3、您同意并已充分了解本协议的条款，承诺不将已发表于本网站的信息，以任何形式发布或授权其它主体以任何方式使用（包括但不限于在各类网站、媒体上使用）。</div>
        <div class="important">4、除法律另有强制性规定外，未经吉好选明确的特别书面许可,任何单位或个人不得以任何方式非法地全部或部分复制、转载、引用、链接、抓取或以其他方式使用本网站的信息内容，否则，吉好选有权追究其法律责任。</div>
        <div class="important">5、本网站所刊登的资料信息（诸如文字、图表、标识、按钮图标、图像、声音文件片段、数字下载、数据编辑和软件），均是吉好选或其内容提供者的财产，受中国和国际版权法的保护。本网站上所有内容的汇编是吉好选的排他财产，受中国和国际版权法的保护。本网站上所有软件都是吉好选或其关联公司或其软件供应商的财产，受中国和国际版权法的保护。</div>
        <div class="title">九、保密义务</div>
        <div class="important">1、本协议任一方（以下简称“获取方”）对于本协议的签订、内容及在履行本协议期间所获知的相对方（以下简称“披露方”）的商业秘密负有保密义务。非经披露方书面同意，不得向任何第三方泄露、给予或转让该等保密信息。（依据法律法规、证券交易所规则向政府、证券交易所和/或其他监管机构提供、协议方的法律、会计、商业及其他顾问、雇员等提供的除外）。</div>
        <div class="important">2、如披露方提出要求，获取方应将单独载有披露方保密信息的任何文件、资料或软件等，在本协议终止后按照披露方的要求归还、销毁，或进行其他处置，不得继续使用或复制、留存。</div>
        <div class="important">3、本协议履行期间及终止后，双方均需履行本协议项下保密义务，直至披露方同意获取方解除此项义务，或事实上不会因获取方违反本协议的保密条款而给披露方造成任何形式的损害时止，包括但不限于保密信息已经由披露方向公众披露的情形等。</div>
        <div class="important">5、协议双方均应告知并督促其因履行本协议之目的而必须获知本协议内容及因合作而获知对方商业秘密的雇员、代理人等遵守保密条款，并对其雇员、代理人等的行为承担连带责任。</div>
        <div class="title">十、通知与送达</div>
        <div class="important">本协议履行过程中，一方传递给另一方的书面通知；或在诉讼程序中，法院对双方进行书面通知的，按照您注册时填写的地址进行送达。书面通知的形式还包括但不限于电子邮件、手机短信和传真等电子方式，在采用电子方式进行书面通知的情况下发送即视为送达。</div>
        <div class="important">一方的送达地址或送达电子邮箱需要变更时应当履行通知义务，通过信件/邮件/电话/短信的方式对另一方进行通知。</div>
        <div class="title">十一、您如何管理您的用户信息</div>
        <div class="important">吉好选非常重视您的用户信息的关注，并尽全力保护您对于用户信息访问、更正、删除以及撤回同意的权利，以使您拥有充分的能力保障您的账户安全。您的权利包括：</div>
        <div class="important">1、访问和更正您的用户信息</div>
        <span class="msg">（1）除法律法规规定外，您有权随时访问和更正您的用户信息，具体包括账户信息、收货信息、订单信息、浏览信息、评论信息、发票信息、档案信息。</span>
        <span class="msg">（2）对于您在使用我们的产品与/或服务过程中产生的其他信息需要访问或更正，请随时联系我们。我们会及时响应您的请求。</span>
        <span class="msg">（3）您无法访问和更正的信息：除上述列明的信息外，您的部分信息我们还无法为您提供访问和更正的服务，这些信息主要是为了提升您的用户体验和保证交易安全所收集的您的设备信息、您使用附加功能时产生的信息。上述信息我们会在您的授权范围内进行使用，您无法访问和更正，但您可联系我们进行删除或做匿名化处理。</span>
        <div class="important">2、删除您的用户信息</div>
        <div class="important">您在我们的产品与/或服务页面中可以直接清除或删除的信息，包括订单信息、浏览信息、收货地址信息；</div>
        <div class="important">在以下情形中，您可以向我们提出删除用户信息的请求：</div>
        <span class="msg">（1）如果我们处理用户信息的行为违反法律法规；</span>
        <span class="msg">（2）如果我们处理用户信息的行为违反了与您的约定；</span>
        <span class="msg">（3）如果您注销了吉好选账户；</span>
        <span class="msg">（4）如果我们终止服务及运营。</span>
        <span class="msg">若我们决定响应您的删除请求，我们还将同时通知从我们获得您的用户信息的实体，要求其及时删除，除非法律法规另有规定，或这些实体获得您的独立授权。当您从我们的服务中删除信息后，我们可能不会立即备份系统中删除相应的信息，但会在备份更新时删除这些信息。</span>
        <div class="important">3、改变您授权同意的范围或撤回您的授权</div>
        <div class="important">您可以通过删除信息、关闭设备功能、在吉好选网站或软件中进行设置等方式改变您授权我们继续收集用户信息的范围或撤回您的授权。您也可以通过注销账户的方式，撤回我们继续收集您用户信息的全部授权。</div>
        <div class="important">请您理解，每个业务功能需要一些基本的用户信息才能得以完成，当您撤回同意或授权后，我们无法继续为您提供撤回同意或授权所对应的服务，也不再处理您相应的用户信息。但您撤回同意或授权的决定，不会影响此前基于您的授权而开展的用户信息处理。</div>
        <div class="title">十二、用户行为规范</div>
        <div class="important">1、本协议依据国家相关法律法规规章制定，您同意严格遵守以下义务：</div>
        <div class="important">
          （1）不得制作、传输或发表以下违法信息资料：反对宪法所确定的基本原则，煽动抗拒、破坏宪法和法律法规实施的；危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的，煽动推翻社会主义制度的；损害国家荣誉和利益的；歪曲、丑化、亵渎、否定英雄烈士事迹和精神，侵害英雄烈士的姓名、肖像、名誉、荣誉的；宣扬或煽动实施恐怖主义、极端主义及其活动的；煽动民族仇恨、民族歧视、破坏民族团结的言论；破坏国家宗教政策，宣扬邪教和封建迷信的；散布谣言，扰乱经济秩序和社会秩序的；散布淫秽、色情、暴力或者教唆犯罪的；侮辱或者诽谤他人，侵害他人名誉、隐私和其他合法权益的；法律、行政法规禁止的其他内容。
        </div>
        <div class="important">
          （2）从中国大陆向境外传输资料信息时必须符合中国有关法规；
        </div>
        <div class="important">
          （3）不得利用本网站从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；
        </div>
        <div class="important">
          （4）不得干扰本网站的正常运转，不得侵入本网站及国家计算机信息系统；
        </div>
        <div class="important">
          （5）不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的、不文明的等信息资料；
        </div>
        <div class="important">
          （6） 不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；
        </div>
        <div class="important">
          （7）不得教唆他人从事违法违规或本协议、平台规则所禁止的行为；
        </div>
        <div class="important">
          （8）不得利用在本网站注册的账户进行牟利性经营活动；
        </div>
        <div class="important">
          （9）不得发布任何侵犯他人个人信息、著作权、商标权等知识产权或合法权利的内容；
        </div>
        <div class="important">
          2、您须对自己在网上的言论和行为承担法律责任，您若在本网站上散布和传播反动、色情或其它违反国家法律的信息，本网站的系统记录有可能作为您违反法律的证据。
        </div>
        <div class="title">十三、法律管辖适用及其他</div>
        <div class="important">1、本协议的订立、执行和解释及争议的解决均应适用中国法律。如双方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，应向协议签订地有管辖权的人民法院提起诉讼。本协议签订地为中华人民共和国吉林省长春市南关区。</div>
        <div class="important">2、如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。</div>
        <div class="important">3、本协议未明示授权的其他权利仍由吉好选保留，您在行使这些权利时须另外取得吉好选的书面许可。吉好选如果未行使前述任何权利，并不构成对该权利的放弃。</div>
        <div class="important">4、本协议内容中以加粗方式显著标识的条款，请您着重阅读。您点击“同意”按钮即视为您完全接受本协议，在点击之前请您再次确认已知悉并完全理解本协议的全部内容。</div>
      </div>
      <span slot="footer" class="dialog-footer dialog-btn">
        <el-button type="primary" class="btn" @click="btnAgree">
          <div class="text">同意并继续</div>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import loginHeader from '@/comments/loginHeader'
import { register, authRegCaptcha } from '@/api/index'
export default {
  components: {
    loginHeader,
  },
  provide() {
    return {
      theme: this, // 方法一：提供祖先组件的实例
    }
  },
  data() {
    // 电话号验证
    const validatePhone = (rule, value, callback) => {
      // console.log(value);
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    // 验证码
    const validateCode = (rule, value, callback) => {
      // console.log(value);
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    // 密码验证
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度应大于6'))
      } else if (value.length > 13) {
        callback(new Error('密码长度不能大于12'))
      } else {
        callback()
      }
    }
    // 密码确认验证
    const validatePasswordConfirm = (rule, value, callback) => {
      if (this.registerForm.password !== value) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        phone: '',
        code: '',
        password: '',
        passwordConfirm: '',
      },
      registerRules: {
        // username: [{
        //     required: true,
        //     trigger: 'blur',
        //     validator: validateUsername
        // }],
        phone: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePhone,
          },
        ],
        code: [
          {
            required: true,
            trigger: 'blur',
            validator: validateCode,
          },
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword,
          },
        ],
        passwordConfirm: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePasswordConfirm,
          },
        ],
      },
      passwordType: 'password',
      loading: false,
      uuid: '',
      show: true,
      count: '',
      timer: null,
      active: 0,
      dialogVisible: null,
      agree: false,
    }
  },
  created() {
    if (this.$route.path === '/businessSign') {
      this.dialogVisible = true
    }
    // this.active = 0
  },
  destroyed() {},
  methods: {
    dialogClose() {
      if (!this.agree) {
        this.$router.push('/login')
      }
    },
    btnAgree() {
      this.agree = true
      this.dialogVisible = false
    },
    handlBack() {},
    showPwd() {
      // 显示隐藏密码
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    // 发送验证码
    sendCode() {
      if (!/^1[3456789]\d{9}$/.test(this.registerForm.phone)) {
        this.$notify.error({
          title: '失败',
          message: '请输入正确的手机号码',
        })
        return
      }
      if (this.show) {
        console.log(this.registerForm.phone)
        var params = {
          mobile: this.registerForm.phone, // 手机号
        }
        authRegCaptcha(params)
          .then((res) => {
            console.log(res)
            this.uuid = res.data.uuid
            // console.log(this.uuid);
            this.$notify({
              title: '成功',
              message: '验证码已发送',
              type: 'success',
            })
          })
          .catch((e) => {
            console.log(e)
          })
      }
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    // 注册
    handleRegister() {
      // 注册
      // if (!this.registerForm.agree) {
      //   this.$notify.error({
      //     title: '失败',
      //     message: '请阅读并同意用户服务协议'
      //   })
      //   return
      // }
      // console.log(this.uuid)
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          var params = {
            mobile: this.registerForm.phone,
            password: this.registerForm.password,
            rePassword: this.registerForm.passwordConfirm,
            code: this.registerForm.code,
            userType: 2,
            uuid: this.uuid,
          }
          console.log(params)
          register(params)
            .then((res) => {
              console.log('注册')
              console.log(res)
              if (res.errno === 0) {
                this.$router.push({
                  name: 'enterprise',
                  params: {
                    userId: res.data.userInfo.id,
                  },
                })
              } else {
                this.$notify.error({
                  title: '失败',
                  message: res.data.message,
                })
              }
            })
            .catch((e) => {
              // console.log(e);
              this.$notify.error({
                title: '失败',
                message: e.data.errmsg,
              })
            })
        }
      })
    },
  },
  watch: {
    $route(to, from) {
      if (to.path === '/businessSign') {
        this.active = 0
      } else {
        this.active = 1
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.base-box {
  width: 1200px;
  margin: 0 auto;
  .steps {
    margin-top: 120px;
    .el-steps {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
    }
  }
  .register-form {
    width: 400px;
    margin: 50px auto;
    text-align: center;
    /deep/ .el-form-item--medium .el-form-item__content,
    .el-form-item--medium .el-form-item__label {
      line-height: 40px;
    }
    /deep/.el-input__inner {
      height: 52px;
    }
    .register-btn {
      width: 100%;
      height: 56px;
      border: 0;
      background: #d6be93;
    }
  }

  .send-code {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #409eff;
    cursor: pointer;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 3px 5px 3px 15px;
    vertical-align: middle;
    width: 20px;
    display: inline-block;
    font-size: 18px;

    &_register {
      font-size: 18px;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      font-weight: 400;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 4px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }

  .back {
    position: absolute;
    top: 35px;
    right: 35px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      color: #409eff;
    }
  }
}
.sign-dialog {
  margin: 20px 16px;
  .red {
    font-size: 16px;
    color: #fe5845;
    letter-spacing: 0;
    text-align: justify;
    line-height: 20px;
  }
  .top-msg {
    margin-top: 6px;
    font-size: 16px;
    color: #606266;
    letter-spacing: 0;
    text-align: justify;
    line-height: 20px;
  }
  .title {
    margin-top: 24px;
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
    text-align: justify;
    line-height: 20px;
  }

  .msg {
    margin-top: 1px;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    text-align: justify;
    line-height: 22px;
  }
  .important {
    font-size: 14px;
    color: #2a2a2a;
    letter-spacing: 0;
    text-align: justify;
    line-height: 22px;
    text-decoration: underline;
  }
  .p-l {
    padding-left: 30px;
  }
}

.dialog-btn {
  width: 100%;

  .btn {
    width: 270px;
    height: 42px;
    background: #337af9;
    border-radius: 4px;
    border: 0;
    margin: 0 auto;
    display: block;

    .text {
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 1px;
      text-align: center;
    }
  }
}
</style>
<style>
input::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
