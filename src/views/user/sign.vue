<template>
  <div>
    <loginHeader></loginHeader>
    <div class="base-box">
      <div v-if="!success" class="sign">
        <div class="title">新用户注册</div>
        <div class="filedContainer">
          <el-input class="input" v-model="data.mobile" type="number" placeholder="输入手机号码">
            <template slot="prepend"><img src="@/assets/images/sign/phone.png" class="input-icon"></template>
          </el-input>
          <el-input class="input input-code" v-model="data.code" center clearable placeholder="请输入短信验证码">
            <template slot="prepend"><img src="@/assets/images/sign/code.png" class="input-icon"></template>
            <template slot="append">
              <el-button type="text" class="input-btn" @click="getCodeEv">
                <span v-if="count > 0">{{ count }}</span>
                <span v-else>发送验证码</span>
              </el-button>
            </template>
          </el-input>
          <el-input class="input" type="password" show-password v-model="data.password" placeholder="请输入登录密码">
            <template slot="prepend"><img src="@/assets/images/sign/password.png" class="input-icon"></template>
          </el-input>
          <el-input class="input" type="password" show-password v-model="data.rePassword" placeholder="请再次输入登录密码">
            <template slot="prepend"><img src="@/assets/images/sign/password.png" class="input-icon"></template>
          </el-input>
          <el-button class="submit" @click="registerUser">
            <div class="text">立即注册</div>
          </el-button>
        </div>
      </div>
      <div v-else>
        <img class="h-icon" src="../../assets/images/wait-pay.png" alt="" />
        <div class="success-title">恭喜注册成功</div>
        <div class="success-msg">请妥善保管您的账户信息</div>
        <el-button class="success-btn" @click="goHome">
          <div class="text">进入首页</div>
        </el-button>
      </div>
    </div>
    <el-dialog title="用户服务协议" :visible.sync="dialogVisible" width="70%" :close-on-click-modal="false" :close-on-press-escape="false" @close="dialogClose">
      <!-- <div class="sign-dialog">
        <div class="red">特别提示</div>
        <div class="top-msg">
          你在使用吉林省旅游控股集团有限责任公司（以下简称“旅控”）提供的各项服务之前，请你务必审慎阅读、充分理解本协议各条款内容，特别是以粗体标注的部分，包括但不限于免除或者限制责任的条款。如你不同意本服务协议及/或随时对其的修改，你应立即停止注册；你一旦使用旅控提供的服务，即视为你已了解并完全同意本服务协议各项内容，包括旅控对服务协议所做的修改，并成为我们的用户。
        </div>
        <div class="title">一、帐号注册</div>
        <span class="msg">
          1、当你按照注册页面提示填写信息并注册成功后，你即成为旅控的“用户”；旅控将给予你一个用户帐号，密码由你自行设置。该用户帐号和密码由你自行负责保管。
          你应当对你在旅控进行的活动和事件负法律责任。
        </span>
        <br/>
        <span class="msg">
          2、本协议服务条款和公告可由旅控定时更新，并按照法定流程进行公示。你在使用相关服务时,应关注并遵守其所适用的相关条款。
        </span>
        <br/>
        <span class="msg">
          3、你确认，在你开始使用本服务前，你应当具备中华人民共和国法律规定的与你行为相适应的民事行为能力。
        </span>
        <span class="important">
          若你不具备前述与你行为相适应的民事行为能力，则你需要在你监护人的陪同下完成注册，并且你与你的监护人应依照法律规定承担因此而导致的一切后果。
        </span>
        <div class="title">二、注册信息和隐私保护</div>
        <span class="msg">
          1、你帐号的所有权归旅控，使用权归你。你按注册页面引导填写信息，阅读并同意本协议且完成全部注册程序后，即可获得注册帐号并成为用户。
        </span>
        <span class="important">
          你应提供及时、详尽及准确的个人资料，并不断更新注册资料，符合及时、详尽准确的要求。如果因注册信息不真实或更新不及时而引发的相关问题，由你自行承担相应的责任。
        </span>
        <br/>
        <span class="msg">
          2、你应当通过真实身份信息认证注册帐号，且你提交的公司名称、统一社会信用代码，法定代表人信息，等注册信息中不得出现违法和不良信息，经公司审核，如存在上述情况，旅控将不予注册；同时，在注册后，如发现你以虚假信息骗取帐号名称注册，或其简介等注册信息存在违法和不良信息的，
        </span>
        <span class="important">
          旅控有权不经通知单方采取限期改正、暂停使用、注销登记、收回等措施。
        </span>
        <br/>
        <span class="msg">
          3、你帐号包括帐户名称和密码，账户名称作为你有效的身份凭证之一。你可使用账户名和密码登录。
        </span>
        <br/>
        <span class="important">
          4、你不应将其帐号、密码转让、出售或出借予他人使用，若你授权他人使用帐户，应对被授权人在该帐户下发生所有行为负全部责任。
        </span>
        <span class="msg">
          由于你其他账户使用信息，仅当依法律法规、司法裁定或经旅控同意，并符合旅控规定的用户帐号转让流程的情况下，方可进行帐号的转让。
        </span>
        <br/>
        <span class="msg">
          5、因你个人原因导致的帐号信息遗失，如需找回帐号信息，请按照帐号找回要求提供相应的信息，并确保提供的信息合法真实有效，
        </span>
        <span class="important">
          若提供的信息不符合要求，无法通过安全验证，旅控有权拒绝提供帐号找回服务；若帐号的唯一凭证不再有效，旅控有权拒绝支持帐号找回。
        </span>
        <span class="msg">
          例如手机号二次出售，旅控可拒绝支持帮助找回原手机号绑定的帐号。
        </span>
        <br/>
        <span class="msg">
          6、当你使用旅控产品进行支付、登录等操作的时候，服务器会自动接收、验证、并记录一些必要的信息，如手机号码、IP地址、服务访问异常信息、以及部分设备信息等，以保障你在使用服务时账户登录和支付过程的安全，进而保护你的上网安全。
        </span>
        <span class="important">
          你使用旅控的服务，即表示你同意旅控可以按照《隐私政策》处理你的个人信息。
        </span>
        <br/>
        <span class="msg">
          7、为更好地向你提供服务，你同意旅控通过通知等形式向你发送相关商业性服务信息。
        </span>
        <div class="title">三、使用规则</div>
        <div class="msg">1、你在使用旅控的服务时，必须遵守中华人民共和国相关法律法规的规定，你应同意将不会利用本服务进行任何违法或不正当的活动，包括但不限于下列行为:</div>
        <div class="msg">（1）你提供的信息不得含有下列内容之一的信息：</div>
        <div class="msg p-l">① 反对宪法所确定的基本原则的；</div>
        <div class="msg p-l">② 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</div>
        <div class="msg p-l">③ 损害国家荣誉和利益的；</div>
        <div class="msg p-l">④ 煽动民族仇恨、民族歧视、破坏民族团结的；</div>
        <div class="msg p-l">⑤ 破坏国家宗教政策，宣扬邪教和封建迷信的；</div>
        <div class="msg p-l">⑥ 散布谣言，扰乱社会秩序，破坏社会稳定的；</div>
        <div class="msg p-l">⑦ 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</div>
        <div class="msg p-l">⑧ 侮辱或者诽谤他人，侵害他人合法权利的；</div>
        <div class="msg p-l">⑨ 含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容；</div>
        <div class="msg p-l">⑩ 含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的；</div>
        <div class="msg">（2）不得为任何非法目的而使用旅控服务系统；</div>
        <div class="msg">（3）不利用旅控的服务从事以下活动：</div>
        <div class="msg p-l">① 未经允许，进入计算机信息网络或者使用计算机信息网络资源的；</div>
        <div class="msg p-l">② 未经允许，对计算机信息网络功能进行删除、修改或者增加的；</div>
        <div class="msg p-l">③ 未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；</div>
        <div class="msg p-l">④ 故意制作、传播计算机病毒等破坏性程序的；</div>
        <div class="msg p-l">⑤ 其他危害计算机信息网络安全的行为。</div>
        <div class="important">2、你违反本协议或相关的服务条款的规定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，你同意赔偿旅控与合作公司、关联公司，并使之免受损害。对此，旅控有权视你的行为性质，采取包括但不限于删除你发布信息内容、暂停使用许可、终止服务、限制使用、回收帐号、追究法律责任等措施。对恶意注册帐号或利用帐号进行违法活动、捣乱、骚扰、欺骗、其他用户以及其他违反本协议的行为，旅控有权回收其帐号。同时，旅控会视司法部门的要求，协助调查。</div>
        <div class="important">3、你需要对自己在服务使用过程中的行为负法律责任，即使你已经终止使用该服务。你承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，以及在旅控首先承担了因你的行为导致的行政处罚或侵权损害赔偿责任后，你应给予旅控等额的赔偿。</div>
        <div class="msg">4、旅控有权根据认定程序及标准判断你账户的使用可能危及你的账户安全及/或旅控平台信息安全的，旅控可拒绝提供相应服务或终止本协议。</div>
        <div class="title">四、服务内容</div>
        <div class="msg">
          1、你在交易过程中与其他用户发生争议的，你或其他用户中任何一方可以自行协商解决，也可以通过旅控介入处理，若你觉得以上的方式均无法达到你要的结果，你可以寻求司法机关的协助。
        </div>
        <div class="msg">
          2、你选择旅控介入的方式处理相关问题，那么你需要遵守和执行旅控的处理结果。若你对旅控的处理结果不满意，你可以寻求其他途径解决纠纷例如起诉、仲裁等方式，但在此之前你需先履行该结果。
        </div>
        <div class="msg">3、旅控目前为你提供免费提供服务，但旅控保留因业务调整或者其他法律法规要求向你收取费用的权利。</div>
        <div class="msg">4、旅控网络服务的具体内容由旅控根据实际情况提供。</div>
        <div class="important">
          5、鉴于网络服务的特殊性，你同意旅控有权不经事先通知，随时变更、中断或终止部分或全部的网络服务（包括收费网络服务）。旅控不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。
        </div>
        <div class="important">
          6、终止服务
        </div>
        <div class="important">
          你同意旅控得基于其自行之考虑，因任何理由，或旅控认为你已经违反本服务协议的文字及精神，终止你的密码、帐号或本服务之使用（或服务之任何部分），并将你在本服务内任何内容加以移除并删除。你同意依本服务协议任何规定提供之本服务，无需进行事先通知即可中断或终止，你承认并同意，旅控可立即关闭或删除你的帐号及你帐号中所有相关信息及文件，及/或禁止继续使用前述文件或本服务。此外，你同意若本服务之使用被中断或终止或你的帐号及相关信息和文件被关闭或删除，旅控对你或任何第三人均不承担任何责任。
        </div>
        <div class="title">四、服务内容</div>
        <div class="msg">
          1、为了保护你的财产及信息安全，预防诈骗或者其他网络犯罪行为，旅控有权收集你的个人信息，包括但不限于个人会员信息、交易信息来判断你个人的交易风险，对你身份进行验证等。
        </div>
        <div class="important">2、根据相关法律法规规定，以下情形中收集你的个人信息无需征得你的授权同意：</div>
        <div class="important">①、涉及公共安全，与重大利益相关的；</div>
        <div class="important">②、与政府部门包括司法机关等相关的；</div>
      </div> -->
      <div class="sign-dialog">
        <div class="red">特别提示</div>
        <div class="top-msg">
          你在使用吉林省旅游控股集团有限责任公司（以下简称“旅控”）提供的各项服务之前，请你务必审慎阅读、充分理解本协议各条款内容，特别是以粗体标注的部分，包括但不限于免除或者限制责任的条款。如你不同意本服务协议及/或随时对其的修改，你应立即停止注册；你一旦使用旅控提供的服务，即视为你已了解并完全同意本服务协议各项内容，包括旅控对服务协议所做的修改，并成为我们的用户。
        </div>
        <div class="title">一、服务条款的确认及接受</div>
        <div class="important">
          1、吉好选网站（以下称“本网站”）的所有权和运作权归属于“吉好选”所有，本网站提供的服务将完全按照其发布的服务条款和操作规则严格执行。您确认所有服务条款并完成注册程序时，本协议在您与本网站间成立并发生法律效力，同时您成为本网站正式用户。
        </div>
        <br />
        <div class="important">
          2、根据国家法律法规变化及本网站运营需要，吉好选有权对本协议条款及相关规则不时地进行修改，修改后的内容一旦以任何形式公布在本网站上即生效，并取代此前相关内容，您应不时关注本网站公告、提示信息及协议、规则等相关内容的变动。您知悉并确认，如您不同意更新后的内容，应立即停止使用本网站；如您继续使用本网站，即视为知悉变动内容并同意接受。 </div>
        <br />
        <div class="important">
          3、本协议内容中以加粗方式显著标识的条款，请您着重阅读。您点击“同意”按钮即视为您完全接受本协议，在点击之前请您再次确认已知悉并完全理解本协议的全部内容。 </div>
        <div class="title">二、服务须知</div>
        <div class="important">
          1、本网站运用自身开发的操作系统通过国际互联网络为用户提供购买商品等服务。使用本网站，您必须： </div>
        <div class="msg">（1）自行配备上网的所需设备，包括个人手机、平板电脑、调制解调器、路由器等；</div>
        <div class="msg">（2）自行负担个人上网所支付的与此服务有关的电话费用、网络费用等；</div>
        <div class="msg">（3）选择与所安装终端设备相匹配的软件版本，包括但不限于iOS、Android、Windows等多个吉好选发布的应用版本。</div>
        <div class="important">
          2、你应当通过真实身份信息认证注册帐号，且你提交的公司名称、统一社会信用代码，法定代表人信息，等注册信息中不得出现违法和不良信息，经公司审核，如存在上述情况，旅控将不予注册；同时，在注册后，如发现你以虚假信息骗取帐号名称注册，或其简介等注册信息存在违法和不良信息的，
        </div>
        <div class="msg">（1）提供的注册资料真实、准确、完整、合法有效，注册资料如有变动的，应及时更新；</div>
        <div class="msg">（2）如果您提供的注册资料不合法、不真实、不准确、不详尽的，您需承担因此引起的相应责任及后果，并且吉好选保留终止您使用本网站各项服务的权利。</div>
        <div class="title">三、订单</div>
        <div class="important">
          1、使用本网站下订单，您应具备购买相关商品的权利能力和行为能力，如果您在18周岁以下，您需要在监护人的监护参与下才能注册并使用本网站。在下订单的同时，即视为您满足上述条件，并对您在订单中提供的所有信息的真实性负责。 </div>
        <div class="important">
          2、在您下订单时，请您仔细确认所购商品的名称、价格、数量、型号、规格、尺寸、联系地址、电话、收货人等信息。收货人与您本人不一致的，收货人的行为和意思表示视为您的行为和意思表示，您应对收货人的行为及意思表示的法律后果承担连带责任。 </div>
        <div class="important">
          3、您理解并同意：本网站上销售商展示的商品和价格等信息仅仅是要约邀请，您下单时须填写您希望购买的商品数量、价款及支付方式、收货人、联系方式、收货地址（合同履行地点）、合同履行方式等内容；系统生成的订单信息是计算机信息系统根据您填写的内容自动生成的数据，仅是您向销售商发出的合同要约；销售商收到您的订单信息后，只有在销售商将您在订单中订购的商品从仓库实际直接向您发出时（以商品出库为标志），方视为您与销售商之间就实际直接向您发出的商品建立了合同关系；如果您在一份订单里订购了多种商品并且销售商只给您发出了部分商品时，您与销售商之间仅就实际直接向您发出的商品建立了合同关系，只有在销售商实际直接向您发出了订单中订购的其他商品时，您和销售商之间就订单中其他已实际直接向您发出的商品才成立合同关系；对于电子书、数字音乐、在线手机充值等数字化商品，您下单并支付货款后合同即成立。当您作为消费者为生活消费需要下单并支付货款的情况下，您货款支付成功后即视为您与销售商之间就已支付货款部分的订单建立了合同关系。 </div>
        <div class="important">
          4、尽管销售商做出最大的努力，但由于市场变化及各种以合理商业努力难以控制因素的影响，本网站无法避免您提交的订单信息中的商品出现缺货、价格标示错误等情况；如您下单所购买的商品出现以上情况，您有权取消订单，销售商亦有权自行取消订单，若您已经付款，则为您办理退款。 </div>
        <div class="title">四、配送和交付</div>
        <div class="important">
          1、您在本网站购买的商品将按照本网站上您所指定的送货地址进行配送。订单信息中列出的送货时间为参考时间，参考时间的计算是根据库存状况、正常的处理过程和送货时间、送货地点的基础上估计得出的。您应当清楚准确地填写您的送货地址、联系人及联系方式等配送信息，您知悉并确认，您所购买的商品应仅由您填写的联系人接受身份查验后接收商品，因您变更联系人或相关配送信息而造成的损失由您自行承担。 </div>
        <div class="important">
          2、因如下情况造成订单延迟或无法配送等，本网站将无法承担迟延配送或无法配送的责任：
        </div>
        <br />
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
          3、您在本网站购买的商品由第三方配送公司（包括顺丰、圆通等，以下称“配送公司”）为您完成订单交付的，系统或单据记录的签收时间为交付时间；您购买的商品采用在线传输方式交付的，销售商向您指定系统发送的时间为交付时间；您购买服务的，生成的电子或者实物凭证中载明的时间为交付时间。 </div>
        <div class="title">五、用户个人信息保护及授权</div>
        <div class="important">1、您知悉并同意，为方便您使用本网站相关服务，本网站将存储您在使用时的必要信息，包括但不限于您的真实姓名、性别、生日、配送地址、联系方式、通讯录、相册、日历、定位信息等。除法律法规规定的情形外，未经您的许可吉好选不会向第三方公开、透露您的个人信息。吉好选对相关信息采取专业加密存储与传输方式，利用合理措施保障用户个人信息的安全。</div>
        <div class="important">2、您知悉并确认，您在注册帐号或使用本网站的过程中，需要提供真实的身份信息，吉好选将根据国家法律法规相关要求，进行基于移动电话号码的真实身份信息认证。若您提供的信息不真实、不完整，则无法使用本网站或在使用过程中受到限制，同时，由此产生的不利后果，由您自行承担。</div>
        <div class="important">3、您在使用本网站某一特定服务时，该服务可能会另有单独的协议、相关业务规则等（以下统称为“单独协议”），您在使用该项服务前请阅读并同意相关的单独协议；您使用前述特定服务，即视为您已阅读并同意接受相关单独协议。</div>
        <div class="important">4、您充分理解并同意：</div>
        <span class="msg">
          （1）接收通过邮件、短信、电话等形式，向在本网站注册、购物的用户、收货人发送的订单信息、促销活动等内容； </span>
        <span class="msg">
          （2）为配合行政监管机关、司法机关执行工作，在法律规定范围内吉好选有权向上述行政、司法机关提供您在使用本网站时所储存的相关信息，包括但不限于您的注册信息等，或使用相关信息进行证据保全，包括但不限于公证、见证等； </span>
        <span class="msg">
          （3）吉好选依法保障您在安装或使用过程中的知情权和选择权，在您使用本网站服务过程中，涉及您设备自带功能的服务会提前征得您同意，您一经确认，吉好选有权开启包括但不限于收集地理位置、读取通讯录、使用摄像头、启用录音等提供服务必要的辅助功能。 </span>
        <span class="msg">
          （4）吉好选有权根据实际情况，在法律规定范围内自行决定单个用户在本网站及服务中数据的最长储存期限以及用户日志的储存期限，并在服务器上为其分配数据最大存储空间等。 </span>
        <div class="title">六、用户行为规范</div>
        <div class="important">1、您同意严格遵守法律法规规章规定，依法遵守以下义务：</div>
        <span class="msg">
          （1）不得制作、传输或发表以下违法信息资料：反对宪法所确定的基本原则，煽动抗拒、破坏宪法和法律法规实施的；危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的，煽动推翻社会主义制度的；损害国家荣誉和利益的；歪曲、丑化、亵渎、否定英雄烈士事迹和精神，侵害英雄烈士的姓名、肖像、名誉、荣誉的；宣扬或煽动实施恐怖主义、极端主义及其活动的；煽动民族仇恨、民族歧视、破坏民族团结的言论；破坏国家宗教政策，宣扬邪教和封建迷信的；散布谣言，扰乱经济秩序和社会秩序的；散布淫秽、色情、暴力或者教唆犯罪的；侮辱或者诽谤他人，侵害他人名誉、隐私和其他合法权益的；法律、行政法规禁止的其他内容。
        </span>
        <span class="msg">
          （2）防范和抵制制作、复制、发布含有下列内容的不良信息资料：标题严重夸张，发表内容与标题严重不符的；不当评述自然灾害、重大事故等灾难的；煽动人群歧视、地域歧视等的；宣扬低俗、庸俗、媚俗内容的；违反社会公德行为的；侵犯未成年人合法权益的；其他对网络生态造成不良影响的内容。
        </span>
        <div class="important">2、本协议依据国家相关法律法规规章制定，您亦同意严格遵守以下义务：</div>
        <span class="msg">
          （1）从中国大陆向境外传输资料信息时必须符合中国有关法规；
        </span>
        <span class="msg">
          （2）不得利用本网站从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；
        </span>
        <span class="msg">
          （3）不得干扰本网站的正常运转，不得侵入本网站及国家计算机信息系统；
        </span>
        <span class="msg">
          （4）不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的、不文明的等信息资料；
        </span>
        <span class="msg">
          （5）不得教唆他人从事违法违规或本协议、平台规则所禁止的行为；
        </span>
        <span class="msg">
          （6）不得利用在本网站注册的账户进行牟利性经营活动；
        </span>
        <span class="msg">
          （7）不得发布任何侵犯他人个人信息、著作权、商标权等知识产权或合法权利的内容；
        </span><br />
        <span class="msg">
          3、您须对自己在网上的言论和行为承担法律责任，您若在本网站上散布和传播反动、色情或其它违反国家法律的信息，本网站的系统记录有可能作为您违反法律的证据。
        </span>

        <div class="title">七、本网站使用规范</div>
        <div class="important">1、关于移动客户端软件的获取与更新：</div>
        <span class="msg">
          （1）您可以直接从吉好选网站上获取吉好选移动客户端软件，也可以从得到吉好选授权的第三方获取，如果您从未经吉好选授权的第三方获取软件或与吉好选移动客户端软件名称相同的安装程序，吉好选无法保证该软件能够正常使用，并对因此给您造成的损失不予负责；
        </span>
        <span class="msg">
          （2）为了改善用户体验、完善服务内容，吉好选将不断努力开发新的服务，并为您不时提供软件更新，新版本发布后，旧版本的软件可能无法使用，吉好选不保证旧版本软件继续可用及相应的客户服务，请您随时核对并下载最新版本。
        </span>
        <div class="important">2、除非法律允许或吉好选书面许可，您使用本网站过程中不得从事下列行为：</div>
        <span class="msg">
          （1）删除本网站及其副本上关于著作权的信息；
        </span>
        <span class="msg">
          （2）对本网站进行反向工程、反向汇编、反向编译，或者以其他方式尝试发现本网站的源代码；
        </span>
        <span class="msg">
          （3）对吉好选拥有知识产权的内容进行使用、出租、出借、复制、修改、链接、转载、汇编、发表、出版、建立镜像站点等；
        </span>
        <span class="msg">
          （4）对本网站或者本网站运行过程中释放到任何终端内存中的数据、网站运行过程中客户端与服务器端的交互数据，以及本网站运行所必需的系统数据，进行复制、修改、增加、删除、挂接运行或创作任何衍生作品，形式包括但不限于使用插件、外挂或非经吉好选授权的第三方工具/服务接入本网站和相关系统；
        </span>
        <span class="msg">
          （5）通过修改或伪造网站运行中的指令、数据，增加、删减、变动网站的功能或运行效果，或者将用于上述用途的软件、方法进行运营或向公众传播，无论这些行为是否为商业目的；
        </span>
        <span class="msg">
          （6）通过非吉好选开发、授权的第三方软件、插件、外挂、系统，登录或使用本网站及服务，或制作、发布、传播上述工具；
        </span>
        <span class="msg">
          （7）自行或者授权他人、第三方软件对本网站及其组件、模块、数据进行干扰。
        </span><br />

        <div class="title">八、违约责任</div>
        <div class="important">1、如果吉好选发现或收到他人举报投诉您违反本协议约定或存在任何恶意行为的，吉好选有权不经通知随时对相关内容进行删除、屏蔽，并视行为情节对违规帐号处以包括但不限于警告、限制或禁止使用部分或全部功能、帐号封禁、注销等处罚，并公告处理结果。</div>
        <div class="important">2、吉好选有权依据合理判断对违反有关法律法规或本协议规定的行为采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，您应独自承担由此而产生的一切法律责任。</div>
        <div class="important">3、您理解并同意，因您违反本协议或相关服务条款的规定，导致或产生第三方主张的任何索赔、要求或损失，您应当独立承担责任；吉好选因此遭受损失的，您也应当一并赔偿。</div>
        <div class="important">4、除非另有明确的书面说明,吉好选不对本网站的运营及其包含在本网站上的信息、内容、材料、产品（包括软件）或服务作任何形式的、明示或默示的声明或担保（根据中华人民共和国法律另有规定的以外）。</div>
        <div class="title">九、所有权及知识产权</div>
        <div class="important">1、您一旦接受本协议，对于您提供、上传、创作、发布在本网站的文字、评论、图片、照片、视频、音频等任何形式的信息内容（包括但不限于客户评价、客户咨询、各类话题文章等），您免费授予吉好选及其关联公司至保护期终止为止、不可撤销的、全球范围的、排他的许可使用著作权（包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可许可使用的权利）、肖像权、用户ID名称等相关的全部合法权利权益，就吉好选具有诉讼主体资格的权利、权益，吉好选有权以自身名义对第三方侵权行为取证及提起诉讼。您同意吉好选及其关联公司有权存储、使用、复制、修订、编辑、发布、展示、翻译、分发、推广、出版、发行、信息网络传播您以上信息内容，有权改编制作派生作品，并以已知或日后开发的形式、媒体或技术将上述信息纳入其它作品内。</div>
        <div class="important">2、吉好选有权再许可给其他第三方第九条第一款的所有权利。</div>
        <div class="important">3、您应确保在吉好选网站上发表的第九条第一款各类信息内容均不涉及侵犯第三方肖像、隐私、知识产权或其他合法权益。否则吉好选有权随时采取包括但不限于删除、断开链接等措施。</div>
        <div class="important">4、本协议已经构成《中华人民共和国著作权法》第二十四条（条文序号依照2010年修订版《著作权法》确定）及相关法律规定的著作财产权等权利许可使用的书面协议，其效力及于您在本网站上发布的任何受著作权法保护的作品内容，无论该等内容形成于本协议订立前还是本协议订立后。</div>
        <div class="important">5、您同意并已充分了解本协议的条款，承诺不将已发表于本网站的信息，以任何形式发布或授权其它主体以任何方式使用（包括但不限于在各类网站、媒体上使用）。</div>
        <div class="msg">6、除法律另有强制性规定外，未经吉好选明确的特别书面同意,任何单位或个人不得以任何方式非法地全部或部分复制、转载、引用、链接、抓取或以其他方式使用本网站的信息内容，否则，吉好选有权追究其法律责任。</div>
        <div class="msg">7、本网站所刊登的资料信息（诸如文字、图表、标识、按钮图标、图像、声音文件片段、数字下载、数据编辑和软件），均是吉好选或其内容提供者的财产，受中国和国际版权法的保护。本网站上所有内容的汇编是吉好选的排他财产，受中国和国际版权法的保护。本网站上所有软件都是吉好选或其关联公司或其软件供应商的财产，受中国和国际版权法的保护。</div>
        <div class="title">十、法律管辖适用及其他</div>
        <div class="important">1、本协议的订立、执行和解释及争议的解决均应适用中国法律。如双方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，应向协议签订地有管辖权的人民法院提起诉讼。本协议签订地为中华人民共和国吉林省长春市南关区。</div>
        <div class="important">2、如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。</div>
        <div class="important">3、本协议未明示授权的其他权利仍由吉好选保留，您在行使这些权利时须另外取得吉好选的书面许可。吉好选如果未行使前述任何权利，并不构成对该权利的放弃。</div>
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
import { mapActions } from 'vuex'

export default {
  components: {
    loginHeader,
  },
  data() {
    return {
      data: {
        mobile: '', // 手机号
        password: '', // 密码
        rePassword: '', // 确认密码
        uuid: '',
        code: '', // 验证码(因短信验证码暂未续费,code随意填写)
      },
      count: 0,
      success: false,
      dialogVisible: true,
      agree: false,
    }
  },
  mounted() {},
  methods: {
    ...mapActions(['Login']),
    getCodeEv() {
      if (/^1[3456789]\d{9}$/.test(this.data.mobile)) {
        const mobile = {
          mobile: this.data.mobile,
        }
        authRegCaptcha(mobile).then((res) => {
          if (res.return_code === '0') {
            this.getCode = false
            const TIME_COUNT = 60
            this.data.uuid = res.data.uuid
            if (!this.timer) {
              this.count = TIME_COUNT
              this.show = false
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--
                } else {
                  this.getCode = true
                  clearInterval(this.timer)
                  this.timer = null
                }
              }, 1000)
            }
          } else {
            this.$message.error(res.return_message)
          }
        })
      } else {
        this.$message.error('手机号格式错误')
      }
    },
    registerUser() {
      if (
        this.data.mobile === '' ||
        this.data.password === '' ||
        this.data.rePassword === '' ||
        this.data.code === ''
      ) {
        this.$message.error('请填写正确填写数据')
        return
      }
      if (
        this.data.password.length < 6
      ) {
        this.$message.error('密码至少6位')
        return
      }
      if (this.data.password !== this.data.rePassword) {
        this.$message.error('密码不一致')
        return
      }
      register(this.data).then((res) => {
        if (res.errno === 0) {
          this.success = true
        } else {
          this.$message.error(res.errmsg)
        }
      })
    },
    goHome() {
      const values = {
        mobile: this.data.mobile,
        password: this.data.password,
        loginType: 1,
      }
      this.Login(values).then(() => {
        this.$router.push('/home')
      })
    },
    btnAgree() {
      this.agree = true
      this.dialogVisible = false
    },
    dialogClose() {
      if (!this.agree) {
        this.$router.push('/login')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.base-box {
  width: 1170px;
  margin: 0 auto;
  overflow-y: auto;

  .sign {
    .title {
      margin-top: 30px;
      margin-bottom: 60px;
      font-size: 26px;
      color: #2e2e2e;
      letter-spacing: 0;
    }

    .filedContainer {
      width: 302px;
      margin: 0 auto;

      /deep/ .el-input-group__prepend {
        background: #fff !important;
        border-right: 0 !important;
      }

      /deep/ .el-input-group__append {
        background: #fff !important;
        border-left: 0 !important;
      }

      /deep/ .el-input__inner {
        border-left: 0 !important;
        padding: 0 15px 0 0;
      }

      /deep/ .el-input__inner:focus {
        border-color: #dcdfe6;
      }

      /deep/ .el-input__inner:hover {
        border-color: #dcdfe6;
      }

      .input {
        margin-bottom: 16px;

        .input-icon {
          width: 16px;
          height: 16px;
        }

        .input-btn {
          font-size: 14px;
          color: #fe5845;
          letter-spacing: -0.06px;
          text-align: right;
          padding-right: 12px;
        }
      }

      .input-code {
        /deep/ .el-input__inner {
          border-right: 0 !important;
        }
      }

      .submit {
        width: 100%;
        height: 42px;
        opacity: 0.9;
        background: #d6be93;
        border-radius: 4px;
        border: 0;

        .text {
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 1px;
          text-align: center;
        }
      }
    }
  }

  .h-icon {
    width: 80px;
    height: 80px;
    margin: 120px auto 16px;
    display: block;
  }

  .success-title {
    font-size: 24px;
    color: #2e2e2e;
    letter-spacing: 0;
    line-height: 24px;
    text-align: center;
    margin-bottom: 10px;
  }

  .success-msg {
    font-size: 14px;
    color: #a6a6a6;
    letter-spacing: 0;
    line-height: 14px;
    text-align: center;
    margin-bottom: 50px;
  }

  .success-btn {
    background: #fff;
    border: 1px solid #424242;
    border-radius: 4px;
    height: 42px;
    width: 181px;
    margin: 0 auto;
    display: block;

    .text {
      opacity: 0.8;
      font-size: 14px;
      color: #424242;
      letter-spacing: 1px;
      text-align: center;
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
    background: #dac49d;
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
