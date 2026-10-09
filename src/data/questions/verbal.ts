import { build, type Raw } from "./build";
import type { Question } from "@/lib/types";

const S = "verbal" as const;
const m = (module: string, raws: Raw[]) => build(S, module, raws);

export const verbal: Question[] = [
...m("Articles and Prepositions", [
  ["e","Articles","Choose the correct article: She is ___ honest girl.",["a","an","the","no article"],1,"‘Honest’ begins with a vowel sound (the h is silent), so ‘an’ is used."],
  ["m","Prepositions of time","Fill in the blank: He has been living in Mumbai ___ 2015.",["for","since","from","during"],1,"‘Since’ goes with a point in time (2015); ‘for’ goes with a duration."],
  ["m","Articles with instruments and sports","Choose the correct option: She plays ___ violin, and her brother plays ___ football.",["a; the","the; the","the; no article","no article; no article"],2,"‘The’ is used with musical instruments; no article is used with games and sports."],
  ["m","Collocations","Fill in the blank: She is very good ___ mathematics.",["in","at","with","on"],1,"‘Good at’ is the standard collocation for a skill or subject."],
  ["h","Dependent prepositions","Fill in the blanks: The new policy is incompatible ___ the company's values, and the staff seem indifferent ___ it.",["with; to","to; with","with; with","for; to"],0,"‘Incompatible with’ and ‘indifferent to’ are the standard collocations."],
]),
...m("Tenses and Subject-Verb Agreement", [
  ["e","Singular subjects","Neither of the two boys ___ present in class yesterday.",["were","was","are","have been"],1,"‘Neither’ takes a singular verb, and ‘yesterday’ needs the past tense: was."],
  ["e","Simple present","She ___ to school by bus every day.",["go","going","goes","gone"],2,"A habitual action with a singular subject takes the simple present: goes."],
  ["m","Past perfect","By the time we reached the theatre, the film ___.",["started","has started","was starting","had started"],3,"Past perfect ‘had started’ shows the film began before we arrived."],
  ["m","Present perfect continuous","The team of engineers ___ working on this project since last March.",["is","have been","has been","was"],2,"‘Team’ is singular, and ‘since’ calls for the present perfect continuous: has been working."],
  ["h","Proximity rule","Not only the manager but also the employees ___ responsible for the delay.",["is","are","was","has been"],1,"With ‘not only … but also’ the verb agrees with the nearer subject, ‘employees’ (plural): are."],
]),
...m("Change of Voice and Speech", [
  ["e","Active to passive","Change to the passive voice: She writes a letter.",["A letter is written by her.","A letter was written by her.","A letter has been written by her.","A letter is being written by her."],0,"Simple present active becomes ‘is/are + past participle’ in the passive."],
  ["m","Passive to active","Change to the active voice: The cake was eaten by the children.",["The children eat the cake.","The children had eaten the cake.","The children ate the cake.","The cake ate the children."],2,"Simple past passive ‘was eaten’ becomes simple past active ‘ate’."],
  ["m","Direct to indirect","Change to indirect speech: He said, “I am busy.”",["He said that he is busy.","He said that he was busy.","He said that I was busy.","He said that he had been busy."],1,"The present tense backshifts to the past, and ‘I’ becomes ‘he’."],
  ["m","Questions in reported speech","Change to indirect speech: She said to me, “Where do you live?”",["She asked me where did I live.","She asked me where you lived.","She told me where I lived.","She asked me where I lived."],3,"A question uses ‘asked’, normal word order (no inversion) and a backshifted tense."],
  ["h","Interrogative passive","Change to the passive voice: Who taught you this song?",["By whom were you taught this song?","By whom was you taught this song?","Who was taught you this song?","Whom were this song taught?"],0,"‘Who’ becomes ‘By whom’, and the verb agrees with ‘you’: were taught."],
]),
...m("Error Spotting and Sentence Correction", [
  ["e","Subject-verb agreement","Find the part with the error: “He do not like coffee in the morning.”",["He do not","like coffee","in the morning","No error"],0,"With a singular subject ‘He’ the correct form is ‘does not’."],
  ["e","Double comparative","Find the part with the error: “She is more smarter than her sister.”",["She is","more smarter","than her sister","No error"],1,"‘Smarter’ is already comparative, so ‘more’ is redundant."],
  ["m","Neither takes a singular verb","Find the part with the error: “Neither of the two answers are correct.”",["Neither of","the two answers","are correct","No error"],2,"‘Neither’ is singular, so the verb should be ‘is correct’."],
  ["m","Stative verbs","Find the part with the error: “I have been knowing him for ten years.”",["I have been knowing","him for","ten years","No error"],0,"‘Know’ is a stative verb and is not used in the continuous form. Use ‘have known’."],
  ["h","Correlative conjunctions","Find the part with the error: “Scarcely had the speaker started the speech than the audience began to leave.”",["Scarcely had the speaker","started the speech","than the audience began to leave","No error"],2,"‘Scarcely’ pairs with ‘when’, not ‘than’ (‘no sooner’ pairs with ‘than’)."],
]),
...m("Synonyms, Antonyms, and Verbal Analogy", [
  ["e","Synonyms","Choose the synonym of RAPID.",["Slow","Quick","Weak","Gentle"],1,"‘Rapid’ means fast, so ‘quick’ is the synonym."],
  ["m","Antonyms","Choose the antonym of BENEVOLENT.",["Kind","Generous","Malevolent","Charitable"],2,"‘Benevolent’ means well-meaning; its opposite is ‘malevolent’ (wishing harm)."],
  ["m","Synonyms","Choose the synonym of EPHEMERAL.",["Eternal","Short-lived","Fragile","Vivid"],1,"‘Ephemeral’ means lasting a very short time."],
  ["m","Verbal analogy","Cobbler : Shoes :: Carpenter : ?",["Wood","Furniture","Hammer","Workshop"],1,"A cobbler makes or repairs shoes; a carpenter makes furniture."],
  ["h","Advanced vocabulary","Choose the synonym of OBSEQUIOUS.",["Arrogant","Servile","Obstinate","Obvious"],1,"‘Obsequious’ means excessively eager to please or obey, i.e., servile."],
]),
...m("Sentence Completion and One-Word Substitution", [
  ["e","Sentence completion","He was so tired that he ___ asleep the moment he lay down.",["fell","felt","fall","fallen"],0,"‘Fell’ is the simple past of ‘fall’ and fits the sentence."],
  ["e","One-word substitution","One word for: a person who loves books.",["Bibliographer","Biologist","Bibliophile","Librarian"],2,"A bibliophile is a lover of books."],
  ["m","One-word substitution","One word for: a government ruled by the wealthy.",["Aristocracy","Plutocracy","Democracy","Theocracy"],1,"Plutocracy is rule by the wealthy (aristocracy is rule by nobility)."],
  ["m","Contextual vocabulary","The auditor's ___ attention to detail ensured that not a single error escaped notice.",["mundane","meticulous","miserly","moderate"],1,"‘Meticulous’ means extremely careful and precise, which fits the context."],
  ["h","Contrast clues","Although the new policy was lauded as innovative, critics found it ___, merely repackaging old ideas.",["pioneering","original","radical","derivative"],3,"‘Derivative’ means imitative of earlier work, which matches ‘repackaging old ideas’."],
]),
...m("Para Jumbles and Cloze Test", [
  ["e","Cloze","Fill in the blank: The sun ___ in the east and sets in the west.",["rise","rises","rose","rising"],1,"A general truth takes the simple present with a singular subject: rises."],
  ["m","Para jumble","Arrange the sentences in order:\nP. He opened it slowly.\nQ. There was a knock at the door.\nR. A stranger stood outside.\nS. Rohan walked towards it.",["SQPR","QPSR","QSPR","RQSP"],2,"Q introduces the knock, S has Rohan go towards ‘it’ (the door), P opens it, and R reveals the stranger: QSPR."],
  ["m","Cloze","Fill in the blank: Technology has ___ the way we communicate; letters that once took days now arrive in seconds.",["transferred","transformed","translated","transmitted"],1,"‘Transformed’ means changed fundamentally, which fits the context."],
  ["m","Para jumble","Arrange the sentences in order:\nP. As a result, prices rose sharply.\nQ. Demand for electric vehicles grew rapidly.\nR. Battery supply, however, could not keep pace.\nS. Manufacturers therefore struggled to expand production.",["QSRP","QRSP","RQSP","PQRS"],1,"Q states the demand; R (‘however’) contrasts with it; S (‘therefore’) follows from R; P (‘as a result’) concludes: QRSP."],
  ["h","Double cloze","The CEO's decision, though controversial, proved (1)___ ; the company's profits (2)___ by 20% within a year.",["prescient; plummeted","reckless; soared","prescient; soared","naive; plummeted"],2,"‘Proved prescient’ with ‘soared’ is consistent: a decision that turned out wise led to higher profits."],
]),
...m("Reading Comprehension", [
  ["e","Direct detail","Passage: Honeybees communicate the location of food through a ‘waggle dance’. The angle of the dance relative to the vertical shows the direction of the food relative to the sun, while the duration of the waggle shows how far away it is.\n\nAccording to the passage, what does the duration of the waggle indicate?",["The direction of the food","The quality of the food","The distance to the food","The number of bees needed"],2,"The passage states that the duration shows how far away the food is."],
  ["e","Main idea","Passage: Urban green spaces lower temperatures, filter air and improve mental health. Yet in many cities, parks are the first to be sacrificed when land is needed for housing.\n\nWhat is the main idea of the passage?",["Cities should stop building houses.","Parks are expensive to maintain.","Urban green spaces offer real benefits but face development pressure.","Mental health is declining in cities."],2,"The passage lists the benefits of green spaces and then notes they are often lost to housing."],
  ["m","Inference","Passage: Remote work has increased flexibility and cut commuting costs. Yet many employees report feeling isolated, and managers struggle to judge productivity without direct oversight.\n\nWhich conclusion is best supported by the passage?",["Remote work brings both benefits and drawbacks for employees and managers.","Remote work should be abandoned.","Managers prefer remote work.","Commuting costs are the biggest workplace problem."],0,"The passage presents advantages (flexibility, lower costs) and difficulties (isolation, oversight) for both groups."],
  ["m","Implication","Passage: The printing press did not make books cheap overnight. Early printed books were costly, but within a few decades the volume of printed material far exceeded what scribes had produced over centuries.\n\nThe passage suggests that the printing press",["made books cheap immediately.","was of little importance.","was used only for manuscripts.","had a growing impact over time despite high initial costs."],3,"The passage contrasts the early high cost with the later explosion in volume."],
  ["h","Common ground","Passage: Critics argue that standardised testing narrows the curriculum, as teachers devote time to tested subjects. Proponents counter that without standard measures, disparities between schools go unnoticed. Both sides, however, accept that test scores alone cannot capture a student's potential.\n\nWhich statement would both critics and proponents most likely accept?",["Standardised tests should be abolished.","Teachers should teach only tested subjects.","Test scores alone do not fully capture a student's potential.","Disparities between schools are unimportant."],2,"The passage explicitly says both sides accept that scores alone cannot capture potential."],
]),
...m("Critical Reasoning", [
  ["e","Alternative explanation","After a school banned mobile phones, test scores rose the following term. Which is the most plausible alternative explanation for the rise?",["A new teaching programme began in the same term.","Students dislike mobile phones.","Mobile phones are expensive.","Test papers were printed in colour."],0,"A concurrent change, such as a new teaching programme, could explain the rise without the phone ban."],
  ["m","Weaken","Argument: Company X's profits rose after it introduced a four-day workweek, so a four-day week raises profits.\nWhich statement most weakens the argument?",["Employees reported higher job satisfaction.","Demand for the entire industry's products surged by 40% in the same period.","Company X is located in a large city.","Some competitors offer flexible hours."],1,"If the whole industry boomed, the profit rise may have come from demand, not the workweek."],
  ["m","Strengthen","Argument: Drinking green tea lowers the risk of heart disease.\nWhich statement most strengthens the argument?",["Green tea is popular in many countries.","Green tea contains caffeine.","A study controlling for diet and exercise found regular green tea drinkers had fewer heart problems.","Many people enjoy the taste of green tea."],2,"Controlling for confounding factors makes the link between green tea and heart health more credible."],
  ["m","Assumption","Argument: The city should build a metro because its roads are congested.\nWhich assumption does the argument rely on?",["Metro construction is cheap.","People enjoy travelling underground.","Roads are not used at night.","A metro would draw enough commuters off the roads to reduce congestion."],3,"The argument only works if the metro would actually reduce road traffic."],
  ["h","Resolving a paradox","A restaurant's number of customers fell by 30% over the year, yet its revenue rose. Which statement best resolves this?",["The restaurant raised its menu prices by about 50%.","The restaurant changed its logo.","The restaurant is located near a school.","Customers prefer vegetarian food."],0,"A sufficiently large price rise can raise revenue even when customer numbers fall (0.7 × 1.5 = 1.05)."],
]),
];
