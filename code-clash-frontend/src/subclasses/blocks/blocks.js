import React from 'react';
import "./blocks.css";
import SyntaxHighlighter from 'react-syntax-highlighter';

/* TODO:
- Wait for the backend guys to do the db stuff
- Ask someone how to do overlay, lmao
- Separate things into different files
- https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-react-component-5604830beb7f
- https://www.javascriptstuff.com/component-communication/#3-callback-functions
*/


class CodeBlock extends React.Component
{	
	
	render()
	{
		//return ( <img className="block" src={this.props.loc} onClick={() => this.click()} style={this.state.s}/> );
		//return (<code className="block" onClick={() => this.click()} style={this.state.s}> hello aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </code>);
		
		//We need some kind of codeblock here. I found syntaxhighlighter, but figure that out later.
		//return (<pre style={{display: "inline"}} className={this.props.lang}> <code className={this.props.class} style={this.state.s} onClick={this.props.click}> {this.props.code} </code> </pre>)
		return (
			/*<pre style={{display: "inline", textAlign: "left"}}>
				<code className={this.props.class} onClick={this.props.click}>
					{this.props.code}
				</code>
			</pre>*/
			<pre style={{display: "inline", textAlign: "left"}}>
				<code>
					<SyntaxHighlighter className={this.props.class} onClick={this.props.click} language='python'>
						{this.props.code}
					</SyntaxHighlighter>
				</code>
			</pre>
		)
	}
}


class OverlayCustom extends React.Component
{
	render()
	{
		return ( <div id="overlay"> </div> );
	}
}

class UI extends React.Component
{
	//We're using this component to do overlay.
	//This is kind of a disgusting solution imo.
	//But what can you do.
	//Brian said that 1st years in future years will continue to work on this code.
	//I hope to god that nobody who's inexperienced has to see this abomination.
	//But I'm also inexperienced.
	//So that's funny.
	
	//Maybe when September rolls around, I'll know what I'm doing.
	
	//--------------------------------------------------------------------------------------
	
	//Update: It's september.
	//I learned more about why this has to be like this, but I still barely know anything.
	//But the upside is that I'm not passing this piece of crap off to anyone yet, so it's still just me looking at this.
	
	constructor(props)
	{
		const a = `coolCampusClubs = ["utscards", "csec", "esutsc"]
print("List of cool clubs on campus: ")
for (club in coolCampusClubs):
	print(club);`
	
		const b = `coolCampusClubs = ["utscards", "csec", "esutsc"]
print("List of cool clubs on campus: ")
while(1):
	counter = 0
	try:
		print(coolCampusClubs[counter])
	except IndexError:
		break`
		
        super(props);
        this.state = { open: false, leftCode: a, rightCode: b };
		
		this.setBlockWrapper = this.setBlockWrapper.bind(this);
		this.overlayRef = React.createRef();
		
		this.openOverlay = this.openOverlay.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
        this.swapCode = this.swapCode.bind(this);
		
    }
	
	//These two functions makes it so whenever you click anywhere (that isn't the box in the middle) in the whole page, the overlay closes.
	componentDidMount()
	{	
        document.addEventListener("click", this.closeOverlay);
		
		this.setBlockWrapper();
    }

    componentWillUnmount()
	{
        document.removeEventListener("click", this.closeOverlay);
    }

    openOverlay(e)
	{
		//console.log(e.target.value);
		//this.state.blockValue = e.target.value;
		//console.log("bv: " + this.state.blockValue);
		//var prettify = 
		
        const style = null;
		//This gets the text of the clicked target directly. I know this breaks abstraction, and it will be fixed soon(tm).
        this.setState({ open: true, style: style, blockValue: e.target.parentNode.textContent });
        document.addEventListener("click", this.closeOverlay);
    }

    closeOverlay(e) 
	{
		console.log(this.overlayRef.current);
		//e.target is DOM element that was clicked.
		//If the clicked element isn't a child of the element associated with blockWrapperNode (the only item with this property is the square in the middle), then close the box.
		if (!this.blockWrapperNode.contains(e.target))
		{
			document.removeEventListener("click", this.closeOverlay);
			const style = { display: "none" };
			this.setState({ style, olBlock: null, open: false });
		}
    }
	
	setBlockWrapper(domNode)
	{
		this.blockWrapperNode = domNode;
	}
	
	swapCode()
	{
		const a = `switch (0)
{
    case 0: // init
        if (!((leftNext = left.MoveNext()) & (rightNext = right.MoveNext())))
            break;
        goto case 1;
    case 1:
        if (left.Current < right.Current)
        {
            l.Add(new Tuple<int, int>(left.Current, 2));
            if ((leftNext = left.MoveNext()))
                goto case 1;
            break;
        }
        goto case 2;
    case 2:
        if (left.Current > right.Current)
        {
            l.Add(new Tuple<int, int>(right.Current, 1));
            if ((rightNext = right.MoveNext()))
                goto case 1;
            break;
        }
        goto case 3;
    case 3:
        l.Add(new Tuple<int, int>(left.Current, 3));
        goto case 0;
}`

		const b = `var factorials = [
"1"
,"2"
,"6"
,"24"
,"120"
,"720"
,"5040"
,"40320"
,"362880"
,"3628800"
,"39916800"
,"479001600"
,"6227020800"
,"87178291200"
,"1307674368000"
,"20922789888000"
,"355687428096000"
,"6402373705728000"
,"121645100408832000"
,"2432902008176640000"
,"51090942171709440000"
,"1124000727777607680000"
,"25852016738884976640000"
,"620448401733239439360000"
,"15511210043330985984000000"
,"403291461126605635584000000"
,"10888869450418352160768000000"
,"304888344611713860501504000000"
,"8841761993739701954543616000000"
,"265252859812191058636308480000000"
,"8222838654177922817725562880000000"
,"263130836933693530167218012160000000"
,"8683317618811886495518194401280000000"
,"295232799039604140847618609643520000000"
,"10333147966386144929666651337523200000000"
,"371993326789901217467999448150835200000000"
,"13763753091226345046315979581580902400000000"
,"523022617466601111760007224100074291200000000"
,"20397882081197443358640281739902897356800000000"
,"815915283247897734345611269596115894272000000000"
,"33452526613163807108170062053440751665152000000000"
,"1405006117752879898543142606244511569936384000000000"
,"60415263063373835637355132068513997507264512000000000"
,"2658271574788448768043625811014615890319638528000000000"
,"119622220865480194561963161495657715064383733760000000000"
,"5502622159812088949850305428800254892961651752960000000000"
,"258623241511168180642964355153611979969197632389120000000000"
,"12413915592536072670862289047373375038521486354677760000000000"
,"608281864034267560872252163321295376887552831379210240000000000"
,"30414093201713378043612608166064768844377641568960512000000000000"
,"1551118753287382280224243016469303211063259720016986112000000000000"
,"80658175170943878571660636856403766975289505440883277824000000000000"
,"4274883284060025564298013753389399649690343788366813724672000000000000"
,"230843697339241380472092742683027581083278564571807941132288000000000000"
,"12696403353658275925965100847566516959580321051449436762275840000000000000"
,"710998587804863451854045647463724949736497978881168458687447040000000000000"
,"40526919504877216755680601905432322134980384796226602145184481280000000000000"
,"2350561331282878571829474910515074683828862318181142924420699914240000000000000"
,"138683118545689835737939019720389406345902876772687432540821294940160000000000000"
,"8320987112741390144276341183223364380754172606361245952449277696409600000000000000"
,"507580213877224798800856812176625227226004528988036003099405939480985600000000000000"
,"31469973260387937525653122354950764088012280797258232192163168247821107200000000000000"
,"1982608315404440064116146708361898137544773690227268628106279599612729753600000000000000"
,"126886932185884164103433389335161480802865516174545192198801894375214704230400000000000000"
,"8247650592082470666723170306785496252186258551345437492922123134388955774976000000000000000"
,"544344939077443064003729240247842752644293064388798874532860126869671081148416000000000000000"
,"36471110918188685288249859096605464427167635314049524593701628500267962436943872000000000000000"
,"2480035542436830599600990418569171581047399201355367672371710738018221445712183296000000000000000"
,"171122452428141311372468338881272839092270544893520369393648040923257279754140647424000000000000000"
,"11978571669969891796072783721689098736458938142546425857555362864628009582789845319680000000000000000"
,"850478588567862317521167644239926010288584608120796235886430763388588680378079017697280000000000000000"
,"61234458376886086861524070385274672740778091784697328983823014963978384987221689274204160000000000000000"
,"4470115461512684340891257138125051110076800700282905015819080092370422104067183317016903680000000000000000"
,"330788544151938641225953028221253782145683251820934971170611926835411235700971565459250872320000000000000000"
,"24809140811395398091946477116594033660926243886570122837795894512655842677572867409443815424000000000000000000"
,"1885494701666050254987932260861146558230394535379329335672487982961844043495537923117729972224000000000000000000"
,"145183092028285869634070784086308284983740379224208358846781574688061991349156420080065207861248000000000000000000"
,"11324281178206297831457521158732046228731749579488251990048962825668835325234200766245086213177344000000000000000000"
,"894618213078297528685144171539831652069808216779571907213868063227837990693501860533361810841010176000000000000000000"
,"71569457046263802294811533723186532165584657342365752577109445058227039255480148842668944867280814080000000000000000000"
,"797126020747367985879734231578109105412357244731625958745865049716390179693892056256184534249745940480000000000000000000"
,"364333701284174842138206989404946643813294067993328617160934076743994734899148613007131808479167119360000000000000000000"
,"239697206586511897471180120610571436503407643446275224357528369751562996629334879591940103770870906880000000000000000000"
,"3314240134565353266999387579130131288000666286242049487118846032383059131291716864129885722968716753156177920000000000000000000"
,"281710411438055027694947944226061159480056634330574206405101912752560026159795933451040286452340924018275123200000000000000000000"
,"24227095383672732381765523203441259715284870552429381750838764496720162249742450276789464634901319465571660595200000000000000000000"
,"2107757298379527717213600518699389595229783738061356212322972511214654115727593174080683423236414793504734471782400000000000000000000"
,"185482642257398439114796845645546284380220968949399346684421580986889562184028199319100141244804501828416633516851200000000000000000000"
,"16507955160908461081216919262453619309839666236496541854913520707833171034378509739399912570787600662729080382999756800000000000000000000"
,"1485715964481761497309522733620825737885569961284688766942216863704985393094065876545992131370884059645617234469978112000000000000000000000"
,"135200152767840296255166568759495142147586866476906677791741734597153670771559994765685283954750449427751168336768008192000000000000000000000"
,"12438414054641307255475324325873553077577991715875414356840239582938137710983519518443046123837041347353107486982656753664000000000000000000000"
,"1156772507081641574759205162306240436214753229576413535186142281213246807121467315215203289516844845303838996289387078090752000000000000000000000"
,"108736615665674308027365285256786601004186803580182872307497374434045199869417927630229109214583415458560865651202385340530688000000000000000000000"
,"10329978488239059262599702099394727095397746340117372869212250571234293987594703124871765375385424468563282236864226607350415360000000000000000000000"
,"991677934870949689209571401541893801158183648651267795444376054838492222809091499987689476037000748982075094738965754305639874560000000000000000000000"
,"96192759682482119853328425949563698712343813919172976158104477319333745612481875498805879175589072651261284189679678167647067832320000000000000000000000"
,"9426890448883247745626185743057242473809693764078951663494238777294707070023223798882976159207729119823605850588608460429412647567360000000000000000000000"
,"933262154439441526816992388562667004907159682643816214685929638952175999932299156089414639761565182862536979208272237582511852109168640000000000000000000000"
,"93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000"
]
print(factorials[n - 1])`

		const c = `try {
    $fix->run();
} catch(Exception $e) {
    try {
        $fix->run();
    } catch(Exception $e) {
            try {
                $fix->run();
            } catch(Exception $e) {
                    $fix->run();
            }
    }
}`

		const d = `abstract class money {
    private static boolean all_different(int s, int e, int n, int d, int m, int o, int r, int y) {
        return ((s!=e) && (s!=n) && (s!=d) && (s!=m) && (s!=o) && (s!=r) && (s!=y) && (e!=n) && (e!=d) && (e!=m) && (e!=o) && (e!=r) && (e!=y) && (n!=d) && (n!=m) && (n!=o) && (n!=r) && (n!=y) && (d!=m) && (d!=o) && (d!=r) && (d!=y) && (m!=o) && (m!=r) && (m!=y) && (o!=r) && (o!=y) && (r!=y));
    }
    public static void main(String[] args) {
        int s, e, n, d, m, o, r, y;
        int num = 0;
        for (s=1; s<10; ++s) {
            for (e=0; e<10; ++e) {
                for (n=0; n<10; ++n) {
                    for (d=0; d<10; ++d) {
                        for (m=1; m<10; ++m) {
                            for (o=0; o<10; ++o) {
                                for (r=0; r<10; ++r) {
                                    for (y=0; y<10; ++y) {
                                        if ((((s*1000 + e*100 + n*10 + d) + (m*1000 + o*100 + r*10 + e)) == (m*10000 + o*1000 + n*100 + e*10 + y)) && all_different(s, e, n, d, m, o, r, y)) {
                                            ++num;
                                            System.out.println("  SEND\n+ MORE\n=MONEY\n\nsolved as:");
                                            System.out.println("  " + (s*1000 + e*100 + n*10 + d));
                                            System.out.println("+ " + (m*1000 + o*100 + r*10 + e));
                                            System.out.println("=" + (m*10000 + o*1000 + n*100 + e*10 + y));
                                            System.out.println("(S = " + s + "; E = " + e + "; N = " + n + "; D = " + d + "; M = " + m + "; O = " + o + "; R = " + r + "; Y = " + y + ")");
                                            System.out.println();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        System.out.println("---\nFound " + num + " solution(s).");
    }
}`

		const e = `# !/usr/bin/env python

import sys
from itertools import permutations

for s, e, n, d, m, o, r, y in permutations(range(10),8): # go through all possible sets of 8 unique digits
    if ( s == 0 or m == 0):
        continue
    if ( ( (           1000*s + 100*e + 10*n + d   \
           +           1000*m + 100*o + 10*r + e ) \
          == 10000*m + 1000*o + 100*n + 10*e + y ) \
        and ( len(set([s, e, n, d, m, o, r, y])) == 8 ) # make sure that none of the values 0-9 are used more than once
    ):
        print "%d%d%d%d+%d%d%d%d=%d%d%d%d%d" % ( s,e,n,d, m,o,r,e, m,o,n,e,y )`
		
		const f = `$(eval("'#" + $(control).data("idfield") + "'")).val(ui.item.Id);`
		
		const i = `for(i=0; 1<101; i++)
{
    encrypt[i];
}while(i != '\0');`

		const j = `public class TutorialStart: MonoBehaviour {

    public Button tutorialButton;

    // Use this for initialization
    void Start () {
        tutorialButton.onClick.AddListener(() => { StartThisGame(); });

    }

    // Update is called once per frame
    void Update () {

    }

    void StartThisGame (){

        Application.LoadLevel("Tutorial");
    }
}`

		const k = `if (product_set_fake_number) {
    if (product_set_fake_time) {
        decrease_after = product_set_fake_time; //in sec
    }
    var cookie_fake_remaining_items = getCookie("cookie_fake_remaining_items");
    if (fake_enable_cookies == '1' && cookie_fake_remaining_items >= min_fake_number_drop_to) {
        console.log('cookies enable');
        fake_remaining_items = cookie_fake_remaining_items;
    } else {
        console.log('cookies not enable');
        fake_remaining_items = product_set_fake_number; //define in getProductCounter.php
    }
    $('#fakenumber').html(fake_remaining_items);
    //setTimeout(fake_progress_back, 1000 * decrease_after_first_item);
    progress_bar_percent = fake_remaining_items * 2;
    setTimeout(progress_back, 300);
    setInterval(fake_progress_back, 1000 * decrease_after);
}`

		const l = `function getPrestigeTitle ($level)
{
    $title = "";
    if ($level >= 500) {
        $title = "Grandmaster C";
    }
    if ($level == 0) { $title = ""; }
    if ($level == 1) { $title = "Explorer I"; }
    if ($level == 2) { $title = "Explorer II"; }
    if ($level == 3) { $title = "Explorer III"; }
    if ($level == 4) { $title = "Explorer IV"; }
    if ($level == 5) { $title = "Explorer V"; }
    if ($level == 6) { $title = "Explorer VI"; }
    if ($level == 7) { $title = "Explorer VII"; }
    if ($level == 8) { $title = "Explorer VIII"; }
    if ($level == 9) { $title = "Explorer IX"; }
    if ($level == 10) { $title = "Explorer X"; }
    if ($level == 11) { $title = "Explorer XI"; }
    if ($level == 12) { $title = "Explorer XII"; }
    if ($level == 13) { $title = "Explorer XIII"; }
    if ($level == 14) { $title = "Explorer XIV"; }
    if ($level == 15) { $title = "Explorer XV"; }
    if ($level == 16) { $title = "Explorer XVI"; }
    if ($level == 17) { $title = "Explorer XVII"; }
    if ($level == 18) { $title = "Explorer XVIII"; }
    if ($level == 19) { $title = "Explorer XIX"; }
    if ($level == 20) { $title = "Explorer XX"; }
    if ($level == 21) { $title = "Explorer XXI"; }
    if ($level == 22) { $title = "Explorer XXII"; }
    if ($level == 23) { $title = "Explorer XXIII"; }
    if ($level == 24) { $title = "Explorer XXIV"; }
    if ($level == 25) { $title = "Explorer XXV"; }
    if ($level == 26) { $title = "Explorer XXVI"; }
    if ($level == 27) { $title = "Explorer XXVII"; }
    if ($level == 28) { $title = "Explorer XXVIII"; }
    if ($level == 29) { $title = "Explorer XXIX"; }
    if ($level == 30) { $title = "Explorer XXX"; }
    if ($level == 31) { $title = "Explorer XXXI"; }
    if ($level == 32) { $title = "Explorer XXXII"; }
    if ($level == 33) { $title = "Explorer XXXIII"; }
    if ($level == 34) { $title = "Explorer XXXIV"; }
    if ($level == 35) { $title = "Explorer XXXV"; }
    if ($level == 36) { $title = "Explorer XXXVI"; }
    if ($level == 37) { $title = "Explorer XXXVII"; }
    if ($level == 38) { $title = "Explorer XXXVIII"; }
    if ($level == 39) { $title = "Explorer XXXIX"; }
    if ($level == 40) { $title = "Explorer XL"; }
    if ($level == 41) { $title = "Explorer XLI"; }
    if ($level == 42) { $title = "Explorer XLII"; }
    if ($level == 43) { $title = "Explorer XLIII"; }
    if ($level == 44) { $title = "Explorer XLIV"; }
    if ($level == 45) { $title = "Explorer XLV"; }
    if ($level == 46) { $title = "Explorer XLVI"; }
    if ($level == 47) { $title = "Explorer XLVII"; }
    if ($level == 48) { $title = "Explorer XLVIII"; }
    if ($level == 49) { $title = "Explorer XLIX"; }
    if ($level == 50) { $title = "Explorer L"; }
    if ($level == 51) { $title = "Explorer LI"; }
    if ($level == 52) { $title = "Explorer LII"; }
    if ($level == 53) { $title = "Explorer LIII"; }
    if ($level == 54) { $title = "Explorer LIV"; }
    if ($level == 55) { $title = "Explorer LV"; }
    if ($level == 56) { $title = "Explorer LVI"; }
    if ($level == 57) { $title = "Explorer LVII"; }
    if ($level == 58) { $title = "Explorer LVIII"; }
    if ($level == 59) { $title = "Explorer LIX"; }
    if ($level == 60) { $title = "Explorer LX"; }
    if ($level == 61) { $title = "Explorer LXI"; }
    if ($level == 62) { $title = "Explorer LXII"; }
    if ($level == 63) { $title = "Explorer LXIII"; }
    if ($level == 64) { $title = "Explorer LXIV"; }
    if ($level == 65) { $title = "Explorer LXV"; }
    if ($level == 66) { $title = "Explorer LXVI"; }
    if ($level == 67) { $title = "Explorer LXVII"; }
    if ($level == 68) { $title = "Explorer LXVIII"; }
    if ($level == 69) { $title = "Explorer LXIX"; }
    if ($level == 70) { $title = "Explorer LXX"; }
    if ($level == 71) { $title = "Explorer LXXI"; }
    if ($level == 72) { $title = "Explorer LXXII"; }
    if ($level == 73) { $title = "Explorer LXXIII"; }
    if ($level == 74) { $title = "Explorer LXXIV"; }
    if ($level == 75) { $title = "Explorer LXXV"; }
    if ($level == 76) { $title = "Explorer LXXVI"; }
    if ($level == 77) { $title = "Explorer LXXVII"; }
    if ($level == 78) { $title = "Explorer LXXVIII"; }
    if ($level == 79) { $title = "Explorer LXXIX"; }
    if ($level == 80) { $title = "Explorer LXXX"; }
    if ($level == 81) { $title = "Explorer LXXXI"; }
    if ($level == 82) { $title = "Explorer LXXXII"; }
    if ($level == 83) { $title = "Explorer LXXXIII"; }
    if ($level == 84) { $title = "Explorer LXXXIV"; }
    if ($level == 85) { $title = "Explorer LXXXV"; }
    if ($level == 86) { $title = "Explorer LXXXVI"; }
    if ($level == 87) { $title = "Explorer LXXXVII"; }
    if ($level == 88) { $title = "Explorer LXXXVIII"; }
    if ($level == 89) { $title = "Explorer LXXXIX"; }
    if ($level == 90) { $title = "Explorer XC"; }
    if ($level == 91) { $title = "Explorer XCI"; }
    if ($level == 92) { $title = "Explorer XCII"; }
    if ($level == 93) { $title = "Explorer XCIII"; }
    if ($level == 94) { $title = "Explorer XCIV"; }
    if ($level == 95) { $title = "Explorer XCV"; }
    if ($level == 96) { $title = "Explorer XCVI"; }
    if ($level == 97) { $title = "Explorer XCVII"; }
    if ($level == 98) { $title = "Explorer XCVIII"; }
    if ($level == 99) { $title = "Explorer XCIX"; }
    if ($level == 100) { $title = "Explorer C"; }
    if ($level == 101) { $title = "Adventurer I"; }
    if ($level == 102) { $title = "Adventurer II"; }
    if ($level == 103) { $title = "Adventurer III"; }
    if ($level == 104) { $title = "Adventurer IV"; }
    if ($level == 105) { $title = "Adventurer V"; }
    if ($level == 106) { $title = "Adventurer VI"; }
    if ($level == 107) { $title = "Adventurer VII"; }
    if ($level == 108) { $title = "Adventurer VIII"; }
    if ($level == 109) { $title = "Adventurer IX"; }
    if ($level == 110) { $title = "Adventurer X"; }
    if ($level == 111) { $title = "Adventurer XI"; }
    if ($level == 112) { $title = "Adventurer XII"; }
    if ($level == 113) { $title = "Adventurer XIII"; }
    if ($level == 114) { $title = "Adventurer XIV"; }
    if ($level == 115) { $title = "Adventurer XV"; }
    if ($level == 116) { $title = "Adventurer XVI"; }
    if ($level == 117) { $title = "Adventurer XVII"; }
    if ($level == 118) { $title = "Adventurer XVIII"; }
    if ($level == 119) { $title = "Adventurer XIX"; }
    if ($level == 120) { $title = "Adventurer XX"; }
    if ($level == 121) { $title = "Adventurer XXI"; }
    if ($level == 122) { $title = "Adventurer XXII"; }
    if ($level == 123) { $title = "Adventurer XXIII"; }
    if ($level == 124) { $title = "Adventurer XXIV"; }
    if ($level == 125) { $title = "Adventurer XXV"; }
    if ($level == 126) { $title = "Adventurer XXVI"; }
    if ($level == 127) { $title = "Adventurer XXVII"; }
    if ($level == 128) { $title = "Adventurer XXVIII"; }
    if ($level == 129) { $title = "Adventurer XXIX"; }
    if ($level == 130) { $title = "Adventurer XXX"; }
    if ($level == 131) { $title = "Adventurer XXXI"; }
    if ($level == 132) { $title = "Adventurer XXXII"; }
    if ($level == 133) { $title = "Adventurer XXXIII"; }
    if ($level == 134) { $title = "Adventurer XXXIV"; }
    if ($level == 135) { $title = "Adventurer XXXV"; }
    if ($level == 136) { $title = "Adventurer XXXVI"; }
    if ($level == 137) { $title = "Adventurer XXXVII"; }
    if ($level == 138) { $title = "Adventurer XXXVIII"; }
    if ($level == 139) { $title = "Adventurer XXXIX"; }
    if ($level == 140) { $title = "Adventurer XL"; }
    if ($level == 141) { $title = "Adventurer XLI"; }
    if ($level == 142) { $title = "Adventurer XLII"; }
    if ($level == 143) { $title = "Adventurer XLIII"; }
    if ($level == 144) { $title = "Adventurer XLIV"; }
    if ($level == 145) { $title = "Adventurer XLV"; }
    if ($level == 146) { $title = "Adventurer XLVI"; }
    if ($level == 147) { $title = "Adventurer XLVII"; }
    if ($level == 148) { $title = "Adventurer XLVIII"; }
    if ($level == 149) { $title = "Adventurer XLIX"; }
    if ($level == 150) { $title = "Adventurer L"; }
    if ($level == 151) { $title = "Adventurer LI"; }
    if ($level == 152) { $title = "Adventurer LII"; }
    if ($level == 153) { $title = "Adventurer LIII"; }
    if ($level == 154) { $title = "Adventurer LIV"; }
    if ($level == 155) { $title = "Adventurer LV"; }
    if ($level == 156) { $title = "Adventurer LVI"; }
    if ($level == 157) { $title = "Adventurer LVII"; }
    if ($level == 158) { $title = "Adventurer LVIII"; }
    if ($level == 159) { $title = "Adventurer LIX"; }
    if ($level == 160) { $title = "Adventurer LX"; }
    if ($level == 161) { $title = "Adventurer LXI"; }
    if ($level == 162) { $title = "Adventurer LXII"; }
    if ($level == 163) { $title = "Adventurer LXIII"; }
    if ($level == 164) { $title = "Adventurer LXIV"; }
    if ($level == 165) { $title = "Adventurer LXV"; }
    if ($level == 166) { $title = "Adventurer LXVI"; }
    if ($level == 167) { $title = "Adventurer LXVII"; }
    if ($level == 168) { $title = "Adventurer LXVIII"; }
    if ($level == 169) { $title = "Adventurer LXIX"; }
    if ($level == 170) { $title = "Adventurer LXX"; }
    if ($level == 171) { $title = "Adventurer LXXI"; }
    if ($level == 172) { $title = "Adventurer LXXII"; }
    if ($level == 173) { $title = "Adventurer LXXIII"; }
    if ($level == 174) { $title = "Adventurer LXXIV"; }
    if ($level == 175) { $title = "Adventurer LXXV"; }
    if ($level == 176) { $title = "Adventurer LXXVI"; }
    if ($level == 177) { $title = "Adventurer LXXVII"; }
    if ($level == 178) { $title = "Adventurer LXXVIII"; }
    if ($level == 179) { $title = "Adventurer LXXIX"; }
    if ($level == 180) { $title = "Adventurer LXXX"; }
    if ($level == 181) { $title = "Adventurer LXXXI"; }
    if ($level == 182) { $title = "Adventurer LXXXII"; }
    if ($level == 183) { $title = "Adventurer LXXXIII"; }
    if ($level == 184) { $title = "Adventurer LXXXIV"; }
    if ($level == 185) { $title = "Adventurer LXXXV"; }
    if ($level == 186) { $title = "Adventurer LXXXVI"; }
    if ($level == 187) { $title = "Adventurer LXXXVII"; }
    if ($level == 188) { $title = "Adventurer LXXXVIII"; }
    if ($level == 189) { $title = "Adventurer LXXXIX"; }
    if ($level == 190) { $title = "Adventurer XC"; }
    if ($level == 191) { $title = "Adventurer XCI"; }
    if ($level == 192) { $title = "Adventurer XCII"; }
    if ($level == 193) { $title = "Adventurer XCIII"; }
    if ($level == 194) { $title = "Adventurer XCIV"; }
    if ($level == 195) { $title = "Adventurer XCV"; }
    if ($level == 196) { $title = "Adventurer XCVI"; }
    if ($level == 197) { $title = "Adventurer XCVII"; }
    if ($level == 198) { $title = "Adventurer XCVIII"; }
    if ($level == 199) { $title = "Adventurer XCIX"; }
    if ($level == 200) { $title = "Adventurer C"; }
    if ($level == 201) { $title = "Veteran I"; }
    if ($level == 202) { $title = "Veteran II"; }
    if ($level == 203) { $title = "Veteran III"; }
    if ($level == 204) { $title = "Veteran IV"; }
    if ($level == 205) { $title = "Veteran V"; }
    if ($level == 206) { $title = "Veteran VI"; }
    if ($level == 207) { $title = "Veteran VII"; }
    if ($level == 208) { $title = "Veteran VIII"; }
    if ($level == 209) { $title = "Veteran IX"; }
    if ($level == 210) { $title = "Veteran X"; }
    if ($level == 211) { $title = "Veteran XI"; }
    if ($level == 212) { $title = "Veteran XII"; }
    if ($level == 213) { $title = "Veteran XIII"; }
    if ($level == 214) { $title = "Veteran XIV"; }
    if ($level == 215) { $title = "Veteran XV"; }
    if ($level == 216) { $title = "Veteran XVI"; }
    if ($level == 217) { $title = "Veteran XVII"; }
    if ($level == 218) { $title = "Veteran XVIII"; }
    if ($level == 219) { $title = "Veteran XIX"; }
    if ($level == 220) { $title = "Veteran XX"; }
    if ($level == 221) { $title = "Veteran XXI"; }
    if ($level == 222) { $title = "Veteran XXII"; }
    if ($level == 223) { $title = "Veteran XXIII"; }
    if ($level == 224) { $title = "Veteran XXIV"; }
    if ($level == 225) { $title = "Veteran XXV"; }
    if ($level == 226) { $title = "Veteran XXVI"; }
    if ($level == 227) { $title = "Veteran XXVII"; }
    if ($level == 228) { $title = "Veteran XXVIII"; }
    if ($level == 229) { $title = "Veteran XXIX"; }
    if ($level == 230) { $title = "Veteran XXX"; }
    if ($level == 231) { $title = "Veteran XXXI"; }
    if ($level == 232) { $title = "Veteran XXXII"; }
    if ($level == 233) { $title = "Veteran XXXIII"; }
    if ($level == 234) { $title = "Veteran XXXIV"; }
    if ($level == 235) { $title = "Veteran XXXV"; }
    if ($level == 236) { $title = "Veteran XXXVI"; }
    if ($level == 237) { $title = "Veteran XXXVII"; }
    if ($level == 238) { $title = "Veteran XXXVIII"; }
    if ($level == 239) { $title = "Veteran XXXIX"; }
    if ($level == 240) { $title = "Veteran XL"; }
    if ($level == 241) { $title = "Veteran XLI"; }
    if ($level == 242) { $title = "Veteran XLII"; }
    if ($level == 243) { $title = "Veteran XLIII"; }
    if ($level == 244) { $title = "Veteran XLIV"; }
    if ($level == 245) { $title = "Veteran XLV"; }
    if ($level == 246) { $title = "Veteran XLVI"; }
    if ($level == 247) { $title = "Veteran XLVII"; }
    if ($level == 248) { $title = "Veteran XLVIII"; }
    if ($level == 249) { $title = "Veteran XLIX"; }
    if ($level == 250) { $title = "Veteran L"; }
    if ($level == 251) { $title = "Veteran LI"; }
    if ($level == 252) { $title = "Veteran LII"; }
    if ($level == 253) { $title = "Veteran LIII"; }
    if ($level == 254) { $title = "Veteran LIV"; }
    if ($level == 255) { $title = "Veteran LV"; }
    if ($level == 256) { $title = "Veteran LVI"; }
    if ($level == 257) { $title = "Veteran LVII"; }
    if ($level == 258) { $title = "Veteran LVIII"; }
    if ($level == 259) { $title = "Veteran LIX"; }
    if ($level == 260) { $title = "Veteran LX"; }
    if ($level == 261) { $title = "Veteran LXI"; }
    if ($level == 262) { $title = "Veteran LXII"; }
    if ($level == 263) { $title = "Veteran LXIII"; }
    if ($level == 264) { $title = "Veteran LXIV"; }
    if ($level == 265) { $title = "Veteran LXV"; }
    if ($level == 266) { $title = "Veteran LXVI"; }
    if ($level == 267) { $title = "Veteran LXVII"; }
    if ($level == 268) { $title = "Veteran LXVIII"; }
    if ($level == 269) { $title = "Veteran LXIX"; }
    if ($level == 270) { $title = "Veteran LXX"; }
    if ($level == 271) { $title = "Veteran LXXI"; }
    if ($level == 272) { $title = "Veteran LXXII"; }
    if ($level == 273) { $title = "Veteran LXXIII"; }
    if ($level == 274) { $title = "Veteran LXXIV"; }
    if ($level == 275) { $title = "Veteran LXXV"; }
    if ($level == 276) { $title = "Veteran LXXVI"; }
    if ($level == 277) { $title = "Veteran LXXVII"; }
    if ($level == 278) { $title = "Veteran LXXVIII"; }
    if ($level == 279) { $title = "Veteran LXXIX"; }
    if ($level == 280) { $title = "Veteran LXXX"; }
    if ($level == 281) { $title = "Veteran LXXXI"; }
    if ($level == 282) { $title = "Veteran LXXXII"; }
    if ($level == 283) { $title = "Veteran LXXXIII"; }
    if ($level == 284) { $title = "Veteran LXXXIV"; }
    if ($level == 285) { $title = "Veteran LXXXV"; }
    if ($level == 286) { $title = "Veteran LXXXVI"; }
    if ($level == 287) { $title = "Veteran LXXXVII"; }
    if ($level == 288) { $title = "Veteran LXXXVIII"; }
    if ($level == 289) { $title = "Veteran LXXXIX"; }
    if ($level == 290) { $title = "Veteran XC"; }
    if ($level == 291) { $title = "Veteran XCI"; }
    if ($level == 292) { $title = "Veteran XCII"; }
    if ($level == 293) { $title = "Veteran XCIII"; }
    if ($level == 294) { $title = "Veteran XCIV"; }
    if ($level == 295) { $title = "Veteran XCV"; }
    if ($level == 296) { $title = "Veteran XCVI"; }
    if ($level == 297) { $title = "Veteran XCVII"; }
    if ($level == 298) { $title = "Veteran XCVIII"; }
    if ($level == 299) { $title = "Veteran XCIX"; }
    if ($level == 300) { $title = "Veteran C"; }
    if ($level == 301) { $title = "Master I"; }
    if ($level == 302) { $title = "Master II"; }
    if ($level == 303) { $title = "Master III"; }
    if ($level == 304) { $title = "Master IV"; }
    if ($level == 305) { $title = "Master V"; }
    if ($level == 306) { $title = "Master VI"; }
    if ($level == 307) { $title = "Master VII"; }
    if ($level == 308) { $title = "Master VIII"; }
    if ($level == 309) { $title = "Master IX"; }
    if ($level == 310) { $title = "Master X"; }
    if ($level == 311) { $title = "Master XI"; }
    if ($level == 312) { $title = "Master XII"; }
    if ($level == 313) { $title = "Master XIII"; }
    if ($level == 314) { $title = "Master XIV"; }
    if ($level == 315) { $title = "Master XV"; }
    if ($level == 316) { $title = "Master XVI"; }
    if ($level == 317) { $title = "Master XVII"; }
    if ($level == 318) { $title = "Master XVIII"; }
    if ($level == 319) { $title = "Master XIX"; }
    if ($level == 320) { $title = "Master XX"; }
    if ($level == 321) { $title = "Master XXI"; }
    if ($level == 322) { $title = "Master XXII"; }
    if ($level == 323) { $title = "Master XXIII"; }
    if ($level == 324) { $title = "Master XXIV"; }
    if ($level == 325) { $title = "Master XXV"; }
    if ($level == 326) { $title = "Master XXVI"; }
    if ($level == 327) { $title = "Master XXVII"; }
    if ($level == 328) { $title = "Master XXVIII"; }
    if ($level == 329) { $title = "Master XXIX"; }
    if ($level == 330) { $title = "Master XXX"; }
    if ($level == 331) { $title = "Master XXXI"; }
    if ($level == 332) { $title = "Master XXXII"; }
    if ($level == 333) { $title = "Master XXXIII"; }
    if ($level == 334) { $title = "Master XXXIV"; }
    if ($level == 335) { $title = "Master XXXV"; }
    if ($level == 336) { $title = "Master XXXVI"; }
    if ($level == 337) { $title = "Master XXXVII"; }
    if ($level == 338) { $title = "Master XXXVIII"; }
    if ($level == 339) { $title = "Master XXXIX"; }
    if ($level == 340) { $title = "Master XL"; }
    if ($level == 341) { $title = "Master XLI"; }
    if ($level == 342) { $title = "Master XLII"; }
    if ($level == 343) { $title = "Master XLIII"; }
    if ($level == 344) { $title = "Master XLIV"; }
    if ($level == 345) { $title = "Master XLV"; }
    if ($level == 346) { $title = "Master XLVI"; }
    if ($level == 347) { $title = "Master XLVII"; }
    if ($level == 348) { $title = "Master XLVIII"; }
    if ($level == 349) { $title = "Master XLIX"; }
    if ($level == 350) { $title = "Master L"; }
    if ($level == 351) { $title = "Master LI"; }
    if ($level == 352) { $title = "Master LII"; }
    if ($level == 353) { $title = "Master LIII"; }
    if ($level == 354) { $title = "Master LIV"; }
    if ($level == 355) { $title = "Master LV"; }
    if ($level == 356) { $title = "Master LVI"; }
    if ($level == 357) { $title = "Master LVII"; }
    if ($level == 358) { $title = "Master LVIII"; }
    if ($level == 359) { $title = "Master LIX"; }
    if ($level == 360) { $title = "Master LX"; }
    if ($level == 361) { $title = "Master LXI"; }
    if ($level == 362) { $title = "Master LXII"; }
    if ($level == 363) { $title = "Master LXIII"; }
    if ($level == 364) { $title = "Master LXIV"; }
    if ($level == 365) { $title = "Master LXV"; }
    if ($level == 366) { $title = "Master LXVI"; }
    if ($level == 367) { $title = "Master LXVII"; }
    if ($level == 368) { $title = "Master LXVIII"; }
    if ($level == 369) { $title = "Master LXIX"; }
    if ($level == 370) { $title = "Master LXX"; }
    if ($level == 371) { $title = "Master LXXI"; }
    if ($level == 372) { $title = "Master LXXII"; }
    if ($level == 373) { $title = "Master LXXIII"; }
    if ($level == 374) { $title = "Master LXXIV"; }
    if ($level == 375) { $title = "Master LXXV"; }
    if ($level == 376) { $title = "Master LXXVI"; }
    if ($level == 377) { $title = "Master LXXVII"; }
    if ($level == 378) { $title = "Master LXXVIII"; }
    if ($level == 379) { $title = "Master LXXIX"; }
    if ($level == 380) { $title = "Master LXXX"; }
    if ($level == 381) { $title = "Master LXXXI"; }
    if ($level == 382) { $title = "Master LXXXII"; }
    if ($level == 383) { $title = "Master LXXXIII"; }
    if ($level == 384) { $title = "Master LXXXIV"; }
    if ($level == 385) { $title = "Master LXXXV"; }
    if ($level == 386) { $title = "Master LXXXVI"; }
    if ($level == 387) { $title = "Master LXXXVII"; }
    if ($level == 388) { $title = "Master LXXXVIII"; }
    if ($level == 389) { $title = "Master LXXXIX"; }
    if ($level == 390) { $title = "Master XC"; }
    if ($level == 391) { $title = "Master XCI"; }
    if ($level == 392) { $title = "Master XCII"; }
    if ($level == 393) { $title = "Master XCIII"; }
    if ($level == 394) { $title = "Master XCIV"; }
    if ($level == 395) { $title = "Master XCV"; }
    if ($level == 396) { $title = "Master XCVI"; }
    if ($level == 397) { $title = "Master XCVII"; }
    if ($level == 398) { $title = "Master XCVIII"; }
    if ($level == 399) { $title = "Master XCIX"; }
    if ($level == 400) { $title = "Master C"; }
    if ($level == 401) { $title = "Grandmaster I"; }
    if ($level == 402) { $title = "Grandmaster II"; }
    if ($level == 403) { $title = "Grandmaster III"; }
    if ($level == 404) { $title = "Grandmaster IV"; }
    if ($level == 405) { $title = "Grandmaster V"; }
    if ($level == 406) { $title = "Grandmaster VI"; }
    if ($level == 407) { $title = "Grandmaster VII"; }
    if ($level == 408) { $title = "Grandmaster VIII"; }
    if ($level == 409) { $title = "Grandmaster IX"; }
    if ($level == 410) { $title = "Grandmaster X"; }
    if ($level == 411) { $title = "Grandmaster XI"; }
    if ($level == 412) { $title = "Grandmaster XII"; }
    if ($level == 413) { $title = "Grandmaster XIII"; }
    if ($level == 414) { $title = "Grandmaster XIV"; }
    if ($level == 415) { $title = "Grandmaster XV"; }
    if ($level == 416) { $title = "Grandmaster XVI"; }
    if ($level == 417) { $title = "Grandmaster XVII"; }
    if ($level == 418) { $title = "Grandmaster XVIII"; }
    if ($level == 419) { $title = "Grandmaster XIX"; }
    if ($level == 420) { $title = "Grandmaster XX"; }
    if ($level == 421) { $title = "Grandmaster XXI"; }
    if ($level == 422) { $title = "Grandmaster XXII"; }
    if ($level == 423) { $title = "Grandmaster XXIII"; }
    if ($level == 424) { $title = "Grandmaster XXIV"; }
    if ($level == 425) { $title = "Grandmaster XXV"; }
    if ($level == 426) { $title = "Grandmaster XXVI"; }
    if ($level == 427) { $title = "Grandmaster XXVII"; }
    if ($level == 428) { $title = "Grandmaster XXVIII"; }
    if ($level == 429) { $title = "Grandmaster XXIX"; }
    if ($level == 430) { $title = "Grandmaster XXX"; }
    if ($level == 431) { $title = "Grandmaster XXXI"; }
    if ($level == 432) { $title = "Grandmaster XXXII"; }
    if ($level == 433) { $title = "Grandmaster XXXIII"; }
    if ($level == 434) { $title = "Grandmaster XXXIV"; }
    if ($level == 435) { $title = "Grandmaster XXXV"; }
    if ($level == 436) { $title = "Grandmaster XXXVI"; }
    if ($level == 437) { $title = "Grandmaster XXXVII"; }
    if ($level == 438) { $title = "Grandmaster XXXVIII"; }
    if ($level == 439) { $title = "Grandmaster XXXIX"; }
    if ($level == 440) { $title = "Grandmaster XL"; }
    if ($level == 441) { $title = "Grandmaster XLI"; }
    if ($level == 442) { $title = "Grandmaster XLII"; }
    if ($level == 443) { $title = "Grandmaster XLIII"; }
    if ($level == 444) { $title = "Grandmaster XLIV"; }
    if ($level == 445) { $title = "Grandmaster XLV"; }
    if ($level == 446) { $title = "Grandmaster XLVI"; }
    if ($level == 447) { $title = "Grandmaster XLVII"; }
    if ($level == 448) { $title = "Grandmaster XLVIII"; }
    if ($level == 449) { $title = "Grandmaster XLIX"; }
    if ($level == 450) { $title = "Grandmaster L"; }
    if ($level == 451) { $title = "Grandmaster LI"; }
    if ($level == 452) { $title = "Grandmaster LII"; }
    if ($level == 453) { $title = "Grandmaster LIII"; }
    if ($level == 454) { $title = "Grandmaster LIV"; }
    if ($level == 455) { $title = "Grandmaster LV"; }
    if ($level == 456) { $title = "Grandmaster LVI"; }
    if ($level == 457) { $title = "Grandmaster LVII"; }
    if ($level == 458) { $title = "Grandmaster LVIII"; }
    if ($level == 459) { $title = "Grandmaster LIX"; }
    if ($level == 460) { $title = "Grandmaster LX"; }
    if ($level == 461) { $title = "Grandmaster LXI"; }
    if ($level == 462) { $title = "Grandmaster LXII"; }
    if ($level == 463) { $title = "Grandmaster LXIII"; }
    if ($level == 464) { $title = "Grandmaster LXIV"; }
    if ($level == 465) { $title = "Grandmaster LXV"; }
    if ($level == 466) { $title = "Grandmaster LXVI"; }
    if ($level == 467) { $title = "Grandmaster LXVII"; }
    if ($level == 468) { $title = "Grandmaster LXVIII"; }
    if ($level == 469) { $title = "Grandmaster LXIX"; }
    if ($level == 470) { $title = "Grandmaster LXX"; }
    if ($level == 471) { $title = "Grandmaster LXXI"; }
    if ($level == 472) { $title = "Grandmaster LXXII"; }
    if ($level == 473) { $title = "Grandmaster LXXIII"; }
    if ($level == 474) { $title = "Grandmaster LXXIV"; }
    if ($level == 475) { $title = "Grandmaster LXXV"; }
    if ($level == 476) { $title = "Grandmaster LXXVI"; }
    if ($level == 477) { $title = "Grandmaster LXXVII"; }
    if ($level == 478) { $title = "Grandmaster LXXVIII"; }
    if ($level == 479) { $title = "Grandmaster LXXIX"; }
    if ($level == 480) { $title = "Grandmaster LXXX"; }
    if ($level == 481) { $title = "Grandmaster LXXXI"; }
    if ($level == 482) { $title = "Grandmaster LXXXII"; }
    if ($level == 483) { $title = "Grandmaster LXXXIII"; }
    if ($level == 484) { $title = "Grandmaster LXXXIV"; }
    if ($level == 485) { $title = "Grandmaster LXXXV"; }
    if ($level == 486) { $title = "Grandmaster LXXXVI"; }
    if ($level == 487) { $title = "Grandmaster LXXXVII"; }
    if ($level == 488) { $title = "Grandmaster LXXXVIII"; }
    if ($level == 489) { $title = "Grandmaster LXXXIX"; }
    if ($level == 490) { $title = "Grandmaster XC"; }
    if ($level == 491) { $title = "Grandmaster XCI"; }
    if ($level == 492) { $title = "Grandmaster XCII"; }
    if ($level == 493) { $title = "Grandmaster XCIII"; }
    if ($level == 494) { $title = "Grandmaster XCIV"; }
    if ($level == 495) { $title = "Grandmaster XCV"; }
    if ($level == 496) { $title = "Grandmaster XCVI"; }
    if ($level == 497) { $title = "Grandmaster XCVII"; }
    if ($level == 498) { $title = "Grandmaster XCVIII"; }
    if ($level == 499) { $title = "Grandmaster XCIX"; }
    if ($level == 500) { $title = "Grandmaster C"; }
    return $title;
}`
		
		const codes = [a, b, c, d, e, f, i, j, k, l];
		
		let g = Math.floor(Math.random() * Math.floor(10));
		let h = Math.floor(Math.random() * Math.floor(10));
		
		while (h == g)
		{
			h = Math.floor(Math.random() * Math.floor(10));
		}
		
		this.setState({leftCode: codes[g], rightCode: codes[h]});
	}
	
	
	render()
	{
		return (
			<div align="center">
				{this.state.open ? <div className="overlay" style={this.state.style}>
					<div ref={this.setBlockWrapper} style={{height: 0}}>
						 <CodeBlock ref={this.overlayRef} class="overlayBlock" code={this.state.blockValue}/>
					</div>
				</div> : null}
				<CodeBlock class="block" code={this.state.leftCode} click={this.openOverlay} /> <CodeBlock class="block" code={this.state.rightCode} click={this.openOverlay}/>
				<div style={{position: "relative"}}>
					<button onClick={this.swapCode}> &lt; </button> Vote! <button onClick={this.swapCode}> &gt; </button>
				</div>
			</div>
		)
	}
}

export default UI;