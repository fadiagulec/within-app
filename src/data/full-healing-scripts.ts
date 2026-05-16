/**
 * Within — Full Guided Healing Sessions.
 *
 * One long-form guided session per chakra. ~15-25 minutes each, read
 * aloud (by ElevenLabs voice via /api/tts) or read by the user.
 *
 * Each script follows the same arc:
 *   1. Welcome + naming the centre and its block
 *   2. Permission
 *   3. Grounding (roots + crown lift)
 *   4. Timeline travel (2 metres above the head, back through time)
 *   5. Earliest memory of the blocking emotion
 *   6. Observe + expand the feeling so it no longer runs you
 *   7. Send love to younger self + everyone involved
 *   8. Return to body
 *   9. Journal prompts
 *  10. Letter writing
 *  11. Stand + integrate new truth
 *  12. Sound activation (LAM / VAM / RAM / YAM / HAM / UMM / AUM / AH)
 *  13. Closing
 *
 * Original content shared by the founder. Crown + Soul Star were drafted
 * in the same template and approved by the founder.
 */

import type { SpineChakraId } from './chakra-spine';

export interface FullHealingScript {
  id: SpineChakraId;
  /** Display title shown at the top of the reader screen. */
  title: string;
  /** Subtitle — the emotional shift the session is for. */
  subtitle: string;
  /** Wheel-of-Life area governed by this centre. */
  lifeArea: string;
  /** The block this session releases. */
  blockingEmotion: string;
  /** What replaces it. */
  newEmotion: string;
  /** The bija seed sound used in the activation. */
  bijaSound: string;
  /** Accent colour for the reader card. */
  color: string;
  /** Estimated duration in minutes. */
  durationMin: number;
  /** The full guided script. Preserve newlines and pauses for TTS. */
  body: string;
}

// ────────────────────────────────────────────────────────────────
// 1. ROOT — Fear → Freedom
// ────────────────────────────────────────────────────────────────

const ROOT: FullHealingScript = {
  id: 'root',
  title: 'Root Energy Centre',
  subtitle: 'Fear → Freedom',
  lifeArea: 'Physical Health',
  blockingEmotion: 'Fear',
  newEmotion: 'Freedom',
  bijaSound: 'LAM',
  color: '#6B1F1F',
  durationMin: 22,
  body: `Welcome.

Today we are working with the Root Energy Centre.

The Root Energy Centre is connected to safety…
security…
survival…
grounding…
trust…
and your connection to life itself.

When this energy centre becomes blocked, fear can take over the nervous system.

Fear of failure.
Fear of rejection.
Fear of loss.
Fear of survival.
Fear of not being enough.
Fear of life itself.

And over time, these fears can disconnect us from feeling safe within our own body and our own life.

Today, we are going to gently bring awareness to the fear you have been carrying…
so you can release it…
heal it…
and reconnect with safety, grounding, and freedom.

You are safe here.

You are supported here.

You are fully held here.

Take a deep breath in…

…and slowly exhale.

Again…

breathing in deeply…

…and exhaling slowly.

Beautiful.

Before we begin, I'm going to ask for your permission to fully participate in this healing experience today.

Please answer yes out loud if you are ready.

Do you give your conscious mind permission to fully trust and engage in this experience today?

Do you give your unconscious and subconscious mind permission to fully trust and engage in this experience today?

And do I, as your guide today, have your permission to guide you safely through this process and safely bring you back into the present moment?

Beautiful.

Now gently close your eyes.

Allow your body to fully relax.

Take a deep breath in…

…and slowly exhale.

Again…

breathing in deeply…

…and exhaling slowly.

Feel the chair beneath you and know that you are safe.

Hear my voice and know that I will be with you throughout this process.

All the sounds around you, including my voice, are helping you relax even more deeply.

Now imagine strong glowing roots extending from the soles of your feet deep down into the Earth below.

Feel yourself grounding deeply into Mother Earth.

Safe.

Supported.

Protected.

Now imagine a beautiful white light above the top of your head.

Your crown energy centre gently opening upward.

As though the universe itself is softly lifting you upward while the Earth grounds you downward.

Grounded below.

Lifted above.

Safe between Heaven and Earth.

Take another deep breath in…

…and exhale slowly.

Now with your eyes closed…

we are going through a timeline experience allowing you to become conscious of your strongest or earliest memory related to fear.

Take a big breath in…

exhale…

and relax.

Pause.

Imagine floating your awareness up out through the top of your head.

Bring your awareness to one metre above the top of your head.

Pause.

You are now one metre high…

looking down and observing yourself.

Now move from one metre up to two metres above the top of your head.

Take another big breath in…

exhale…

and relax.

Pause.

You are now two metres above the top of your head…

observing yourself…

and feeling completely safe.

As you stay two metres above the top of your head…

start going back in time now.

Pause.

See yourself yesterday…

what you did when you woke up…

what happened throughout your day…

Now move further back to last week…

last month…

last year…

Keep floating back across your timeline…

through your teenage years…

through childhood…

all the way back…

and go to the strongest or earliest memory related to fear.

Go there now.

Pause.

Staying two metres above the top of your head…

give me a nod once you have found the memory.

Pause.

Now staying safely above the timeline…

observe what is happening in this moment.

Observe where you are.

How old you are.

Who is involved.

Notice what you are feeling.

And remember…

you are safe.

Take a deep breath in…

…and out.

Pause.

As you continue observing this memory…

notice the fear that was stored there.

Notice how it felt in your body.

Notice what you believed about yourself in that moment.

Pause.

Now…

expand this feeling.

Make it so big…

that you never have to carry it again.

Allow yourself to fully feel everything that was never fully processed.

Everything that was suppressed.

Everything your body held onto.

Breathe deeply.

Shoulders back.

You are doing beautifully.

Remember…

the feeling is the healing.

Pause.

Now staying two metres above your younger self…

send some love to the younger version of you.

Let them know they are safe.

Let them know they survived.

Let them know they are loved.

And now send love to everyone involved.

Pause.

Now gently say goodbye for now to your younger self.

And as you continue breathing deeply into your belly…

begin coming forward across the timeline…

back toward this present moment…

bringing back all the wisdom…

all the strength…

all the growth…

and leaving behind the fear.

Pause.

One more big breath in…

and as you exhale…

you are fully conscious and aware of this memory.

And you are back in your body in…

3…

2…

1…

When you are ready…

gently open your eyes.

Beautiful.

You are doing amazing.

Now take your journal and begin writing about your earliest or strongest memory related to fear.

What happened?

How old were you?

Where did it take place?

Who was involved?

What did you fear most in that moment?

Pause.

What did this fear make you believe about yourself?

How has this fear affected your life?

Your decisions?

Your confidence?

Your relationships?

Your ability to trust yourself?

Pause.

Now let's move into the next part of this breakthrough.

When you are ready…

begin writing a letter from your heart to yourself…

the situation…

or another person involved.

Express everything you need to express in order to heal this fear fully.

You may write:
I forgive myself…
I release this fear…
I am safe now…
Thank you for the lessons…
Thank you for the strength this gave me…

Write whatever your heart needs to say.

Pause.

You are doing beautifully.

Pause.

Now let's uncover the hidden value within this fear.

Fear always points toward something deeply important.

So reflect now…

What value was this fear trying to protect?

Was it safety?

Trust?

Love?

Connection?

Freedom?

Write down what this fear was teaching you.

Pause.

Now write:

"My new value is…"

Pause.

Beautiful.

Now slowly stand up.

Take a long deep breath in…

…and out.

Roll your shoulders back.

Chest up.

Chin up.

Feel the energy moving through your entire body.

Pause.

When you are ready…

read your new value out loud.

Pause.

Beautiful.

Now take another deep breath in…

…and as you exhale…

allow your new value to replace the old emotion of fear.

Take another big breath in…

and let go of the fear completely.

Feel the freedom moving through your body now.

Pause.

Notice what you are feeling.

Pause.

How are you feeling now?

Pause.

Would you be open to integrating this healing further with a sound activation?

Pause.

While standing…

together we are going to make a specific sound to activate the Root Energy Centre.

The sound to activate this powerful energy centre is LAM.

Grounding down…

feet on the Earth…

spread your legs apart.

Imagine your roots going deep into the core of the Earth.

At the same time…

imagine your crown energy centre pulling you upward like a magnet.

Grounded below.

Lifted above.

Heart open.

Take a deep breath all the way in.

3…

2…

1…

LAMMMMMMMMM…

Again…

LAMMMMMMMMM…

Feel the vibration moving through your Root Energy Centre.

Feel safety returning to your body.

Feel grounding returning to your nervous system.

Pause.

Now slowly take a seat again.

Notice how your body feels.

Notice how your energy feels.

Notice how much lighter and safer you feel compared to the beginning of this session.

What have you learned about yourself today?

How many ways do you think this will positively impact other areas of your life?

Pause.

Thank you for allowing yourself to receive this healing today.

Thank you for your courage.

And thank you for allowing me to hold this sacred space with you.

Take one final deep breath in…

…and slowly exhale.

And when you are ready…

fully return to the room.`,
};

// ────────────────────────────────────────────────────────────────
// 2. SACRAL — Guilt → Gratitude
// ────────────────────────────────────────────────────────────────

const SACRAL: FullHealingScript = {
  id: 'sacral',
  title: 'Sacral Energy Centre',
  subtitle: 'Guilt → Gratitude',
  lifeArea: 'Mind & Emotional State',
  blockingEmotion: 'Guilt',
  newEmotion: 'Gratitude',
  bijaSound: 'VAM',
  color: '#E07A2C',
  durationMin: 20,
  body: `Welcome.

Today we are working with the Sacral Energy Centre.

This energy centre is connected to emotions…
pleasure…
creativity…
relationships…
sensuality…
joy…
and emotional expression.

When this centre becomes blocked, guilt often becomes trapped within the body and nervous system.

Guilt for things we did.
Guilt for things we didn't do.
Guilt for disappointing others.
Guilt for choosing ourselves.
Guilt for simply being human.

And over time, guilt suppresses emotional flow and disconnects us from joy, creativity, freedom, and self-love.

Today, we are going to gently bring awareness to the guilt you have been carrying…
so you can release it…
heal it…
and reconnect with emotional freedom and gratitude.

You are safe here.

You are supported here.

You are fully held here.

Take a deep breath in…

…and slowly exhale.

Again…

breathing in deeply…

…and exhaling slowly.

Beautiful.

Before we begin, I'm going to ask for your permission to fully participate in this healing experience today.

Do you give your conscious mind permission to fully trust and engage in this experience today?

Do you give your unconscious and subconscious mind permission to fully trust and engage in this experience today?

And do I, as your guide today, have your permission to safely guide you through this process and safely bring you back into the present moment?

Beautiful.

Now gently close your eyes.

Allow your body to fully relax.

Take a deep breath in…

…and slowly exhale.

Feel the chair beneath you and know that you are safe.

Hear my voice and know that I will be with you throughout this process.

All the sounds around you are helping you relax more deeply.

Now imagine strong glowing roots extending from the soles of your feet deep down into the Earth below.

Feel yourself grounding deeply into Mother Earth.

Safe.

Supported.

Protected.

Now imagine a beautiful white light above the top of your head.

Your crown energy centre gently opening upward.

As though the universe itself is lifting you upward while the Earth grounds you downward.

Grounded below.

Lifted above.

Safe between Heaven and Earth.

Take another deep breath in…

…and exhale slowly.

Now with your eyes closed…

we are going through a timeline experience allowing you to become conscious of your strongest or earliest memory related to guilt.

Take a big breath in…

exhale…

and relax.

Pause.

Bring your awareness to one metre above the top of your head.

Now move from one metre up to two metres above the top of your head.

Take another breath in…

exhale…

and relax.

Pause.

You are now two metres above the top of your head…

observing yourself safely.

As you stay above your timeline…

begin going back in time now.

Back through your memories…

through your experiences…

all the way back…

to the strongest or earliest memory related to guilt.

Go there now.

Pause.

Observe what is happening.

Notice where you are.

How old you are.

Who is involved.

Notice what happened.

Notice what you are feeling.

Pause.

Now notice the guilt stored there.

The emotional burden you have been carrying.

The blame.

The shame.

The emotional heaviness.

Pause.

Now…

expand this feeling.

Allow yourself to fully feel it so you no longer have to carry it unconsciously.

Breathe deeply.

Shoulders back.

You are safe.

Pause.

Now ask yourself gently…

What was this guilt trying to teach me?

What hidden value was underneath this experience?

What did I truly need in that moment?

Pause.

Now send love to the younger version of yourself.

Tell them:

You are forgiven.

You are human.

You did the best you could with the awareness you had at the time.

You are worthy of love.

You are safe now.

Pause.

Now gently say goodbye to your younger self for now.

And as you continue breathing deeply…

begin moving forward across the timeline…

back toward the present moment…

bringing back only the wisdom…

the compassion…

the emotional freedom…

and leaving behind all guilt.

Pause.

One more big breath in…

and as you exhale…

you are fully back in your body in…

3…

2…

1…

When you are ready…

gently open your eyes.

Beautiful.

Now take your journal and begin writing.

Who or what do you feel the most guilt toward?

Yourself?
Another person?
A situation?
A decision?

Write freely.

Pause.

How has this guilt affected your emotional wellbeing?

Your relationships?

Your confidence?

Your happiness?

Pause.

Now write a letter from a place of gratitude and forgiveness.

Express everything you need to say in order to free yourself emotionally.

You may write:

I forgive myself…
I release this burden…
I choose peace…
I choose emotional freedom…
Thank you for the lessons…
Thank you for the growth…

Pause.

Beautiful.

Now write:

"My new value is…"

Pause.

Now slowly stand up.

Roll your shoulders back.

Chest open.

Chin up.

Take a deep breath in…

…and out.

Shake your arms.

Shake your shoulders.

Shake your hips.

Allow your body to release all remaining emotional heaviness.

Breathe deeply.

Feel emotional energy moving through your body.

Pause.

Now read your new value out loud.

Pause.

Beautiful.

Would you be open to integrating this healing further with a sound activation?

Pause.

The sound to activate this powerful energy centre is VAM.

Grounding down…

feet on the Earth…

roots deep below…

crown lifted above…

heart open.

Take a deep breath all the way in.

3…

2…

1…

VAMMMMMMMMM…

Again…

VAMMMMMMMMM…

Feel the vibration moving through your Sacral Energy Centre.

Feel emotional freedom returning to your body.

Feel gratitude replacing guilt.

Pause.

Now slowly take a seat again.

Notice how your body feels.

Notice how your emotions feel.

Notice how much lighter and freer you feel compared to the beginning of this session.

What have you learned about yourself today?

How many ways do you think this healing will positively affect your life moving forward?

Pause.

Thank you for allowing yourself to receive this healing today.

Thank you for your courage.

And thank you for allowing me to hold this sacred space with you.

Take one final deep breath in…

…and slowly exhale.

And when you are ready…

fully return to the room.`,
};

// ────────────────────────────────────────────────────────────────
// 3. SOLAR PLEXUS — Money Program / Self-Worth
// ────────────────────────────────────────────────────────────────

const SOLAR_PLEXUS: FullHealingScript = {
  id: 'solar-plexus',
  title: 'Solar Plexus Energy Centre',
  subtitle: 'Shame → Self-Worth · Money Program',
  lifeArea: 'Financial Wellbeing',
  blockingEmotion: 'Shame / Scarcity',
  newEmotion: 'Self-Worth / Abundance',
  bijaSound: 'RAM',
  color: '#E8B83E',
  durationMin: 22,
  body: `Welcome.

Today we are working with the Solar Plexus Energy Centre.

This energy centre is connected to personal power, self-worth, confidence, ambition, financial wellbeing, and your relationship with money and abundance.

The Solar Plexus is located in the upper abdomen, around the stomach area.

When this centre is underactive, it can create feelings of scarcity, low self-worth, inadequacy, and difficulty claiming or managing financial resources.

When it is overactive, it can show up as control, competitiveness, burnout, or an excessive focus on money and power.

Today we are going to gently explore your relationship with money, not from judgement, but from awareness.

Because money itself is not the problem.

Money is energy.

The real blockage is often the emotion, belief, or program we have attached to money.

So today, we are going to uncover the old money program, understand where it came from, and begin creating a new relationship with money based on gratitude, trust, self-worth, and abundance.

Take a deep breath in…

…and slowly exhale.

Before we begin, I'm going to ask for your permission.

Do you give your conscious mind permission to fully trust and engage in this experience today?

Do you give your unconscious and subconscious mind permission to fully trust and engage in this experience today?

And do I, as your guide today, have your permission to guide you back in time, into a past experience, hold space for you, and then guide you safely back into the now?

Beautiful.

Now gently close your eyes.

Feel the chair beneath you and know that you are safe.

Hear my voice and know that I am with you.

All the sounds around you, including my voice, are helping you relax and focus even more.

Take a deep breath in…

…and slowly exhale.

Imagine strong roots growing from the soles of your feet deep down into the Earth.

Feel yourself grounded through the Root Energy Centre.

Safe.

Supported.

Connected to the Earth.

Now imagine your Crown Energy Centre gently opening upward.

A soft light above your head lifting you upward.

Grounded through 1.

Lifted through 7.

Safe between Earth and Source.

Now bring your awareness into the space around your Solar Plexus.

The upper abdomen.

The power centre.

The abundance centre.

The warrior centre.

Breathe into this space.

Right now, we are going through a timeline experience that allows you to become conscious of your earliest memories of money.

Take a big breath in…

exhale…

and relax.

Bring your awareness to one metre above the top of your head.

You are now one metre high, looking down and observing yourself.

Now move from one metre up to two metres above the top of your head.

Take another big breath in…

exhale…

and relax.

You are now two metres above the top of your head, observing yourself and feeling safe.

As you stay two metres above the top of your head, begin going back in time now.

Scanning your entire timeline all the way back.

Back to childhood.

Back to your earliest memory where your parents, caregivers, or the people who raised you were having a conversation around money.

Go there now.

Pause.

Staying two metres above the top of your head, observe the memory.

What is the conversation around money?

What is the energy in the house?

What emotions are present?

Is it fear?

Scarcity?

Worry?

Stress?

Or is it love, safety, trust, security, and gratitude?

Pause.

Feel what you felt back then.

Notice the emotion connected to money in that environment.

Pause.

Staying two metres above your younger self, send love to the younger version of you and everyone involved.

Pause.

When you are ready, say goodbye for now to your younger self.

Continue breathing deeply into your belly as you begin coming forward across the timeline…

back to this very moment…

here and now.

One more big breath in…

and as you exhale, you are fully conscious and aware of this memory.

Bring yourself fully back into the body.

In 3…

2…

1…

When you are ready, open your eyes.

Welcome back.

Now begin journaling about the most frequent feeling in your household when it came to money.

Was money connected to fear?

Or was money connected to love?

Write that down now.

Pause.

Fear equals contraction.

Love equals expansion.

Take some time to reflect.

How has this affected your life and finances?

Pause.

Now knowing that everything in the universe is energy…

would you agree that money is also energy?

Pause.

Now close your eyes again if that feels right.

Picture money as a long-lost friend.

A friend who has always been there, offering essentials like food, shelter, support, opportunity, and choice.

Yet perhaps an old program has kept this friend at a distance.

Now imagine money as energy coming and knocking at your door.

You open the door.

You see this old friend standing there.

A friend you may have rejected, feared, judged, pushed away, or misunderstood.

Pause.

Now apologise for your past reluctance.

Express your appreciation.

Warmly invite money back into your life, along with all of its friends.

Recognise now that your issue was not with money.

It was with the attitude, emotion, or program around money.

Repeat after me:

I didn't have a money problem.

I had a money program.

Pause.

Now take your journal and write a letter to money.

Write from your heart to the spirit of money.

Say what you never got to say.

Imagine money as your friend, your partner, your support.

You may begin:

Dear money…

I love you so much.

Thank you for…

Please forgive me for…

Write whatever you need to express to heal this relationship now.

Pause.

What are the words money really wants to hear from you?

Write them now.

Pause.

Now dream big, as if anything is possible.

What are you going to do with your money now that you are grateful for it and welcoming its presence?

Pause.

Beautiful.

Now let's integrate your new truth.

When money comes knocking on your door again, what are you going to say from now on?

What are you going to do?

What will your new relationship with money be from now on?

Will you see money with more gratitude?

Pause.

Now put down your pen and stand up.

Take a long breath in…

and out.

Roll your shoulders back.

Chest up.

Chin up.

Feel energy moving through your entire being.

Take another deep breath in…

and out.

Allow your new money program to integrate into your body.

Pause.

Would you be open to integrating this new truth further with a sound activation?

The sound to activate the Solar Plexus Energy Centre is RAM.

Grounding down…

feet on the Earth…

roots going deep into the core of the Earth.

At the same time, imagine your Crown Energy Centre being lifted upward like a magnet.

Open your heart.

Take a big breath all the way in.

3…

2…

1…

RAMMMMMMMMM…

Again…

RAMMMMMMMMM…

Now imagine this third energy centre, this power centre, this warrior centre, this abundance centre, exploding with golden light.

That golden light now flows back in and fills your entire being.

Big breath in…

draw that abundance all the way in.

And exhale…

breathing all the way out.

Take a seat.

How are you feeling now compared to the beginning of the session?

How does your relationship with money feel now?

What have you learned about yourself?

How many ways will this change other areas of your life?

Thank you for allowing yourself to receive this healing today.

Take one final deep breath in…

and slowly exhale.

Fully return to the room.`,
};

// ────────────────────────────────────────────────────────────────
// 4. HEART — Grief → Grace
// ────────────────────────────────────────────────────────────────

const HEART: FullHealingScript = {
  id: 'heart',
  title: 'Heart Energy Centre',
  subtitle: 'Grief → Grace · Relationships & Love',
  lifeArea: 'Relationships',
  blockingEmotion: 'Grief',
  newEmotion: 'Grace',
  bijaSound: 'YAM',
  color: '#3F8A5F',
  durationMin: 24,
  body: `Welcome.

Today we are working with the Heart Energy Centre.

The Heart Energy Centre is connected to love, compassion, forgiveness, emotional connection, relationships, self-love, and the ability to give and receive love.

This centre is located in the centre of the chest.

Sometimes past hurts, grief, loss, heartbreak, disappointment, or unhealed emotional wounds can block the heart from fully experiencing love and compassion.

Grief is not only connected to the passing of a loved one.

It can come from the end of a relationship…

the loss of a dream…

the loss of a version of yourself…

a life change…

a place…

a person…

a situation…

or something your heart never had the chance to fully process.

Today, we will gently bring awareness to what has been held in the Heart Energy Centre.

You will remain safe.

You will observe from a distance.

And I will guide and support you every step of the way.

Take a deep breath in…

and slowly exhale.

Before we begin, I'm going to ask for your permission.

Do you give your conscious mind permission to fully trust and engage in this experience today?

Do you give your unconscious and subconscious mind permission to fully trust and engage in this experience today?

And do I, as your guide today, have your permission to guide you back in time, into a past experience, hold space for you, and then guide you safely back into the now?

Beautiful.

Now close your eyes.

Bring your awareness to your breath.

Feel the chair beneath you.

Know that you are safe.

Hear my voice and know that I am with you.

All the sounds around you, including my voice, are helping you relax and focus even more.

Imagine strong roots extending from your feet deep into the Earth.

Feel yourself grounded through the Root Energy Centre.

Now imagine your Crown Energy Centre gently opening upward.

A soft light above your head lifting you upward.

Grounded through 1.

Lifted through 7.

Safe between Earth and Source.

Now bring your breath into the space in and around your heart.

The centre of your chest.

Breathe gently into your heart.

With your eyes closed, we are going through a timeline experience allowing you to become conscious of your greatest loss or your earliest memory related to grief.

Take a big breath in…

exhale…

and relax.

Bring your awareness to one metre above the top of your head.

You are now one metre high, looking down and observing yourself.

Now move from one metre up to two metres above the top of your head.

Take another big breath in…

exhale…

and relax.

You are now two metres above the top of your head, observing yourself and feeling safe.

As you stay two metres above the top of your head, start going back in time now.

Scanning your entire timeline all the way back.

Go to the strongest or earliest memory related to grief.

Go there now.

Pause.

Staying two metres above the top of your head, give me a nod once you have found a memory.

Pause.

As you are there, in this grief-related memory, observe what is happening.

Feel the feeling that you felt back then.

Breathe in and out.

Shoulders back.

Staying two metres above the top of your head, looking down at your timeline, notice what is happening in this moment.

Observe where you are.

How old you are.

Who or what you are grieving.

Remember to breathe.

And remember that you are safe.

Pause.

As you continue to observe what is happening, notice what you are feeling.

Now expand this feeling.

Make it so big that you never have to feel it again.

Pause.

Staying two metres above your younger self, send love to the younger version of you and everyone involved.

Pause.

When you are ready, say goodbye for now to your younger self.

Continue breathing deep into your belly as you begin coming forward across the timeline…

back to this very moment…

here and now.

One more big breath in…

and as you exhale, you are fully conscious and aware of this memory.

Bring yourself back into the body.

You are back in your body in…

3…

2…

1…

When you are ready, open your eyes.

Welcome back.

Are you willing to share what you just experienced?

Pause.

Thank you for your honesty and vulnerability.

Now begin journaling your earliest or strongest memory related to grief.

Is it a person?

A situation?

A part of yourself?

A place?

A dream?

Something else?

What happened?

How old were you?

Where did it take place?

Who was involved?

Start writing whenever you are ready.

Pause.

How has this grief affected your life?

How has it affected your relationships?

Pause.

You have done amazing so far.

Now we move into the next part of the process.

This is an opportunity to say what was left unsaid.

Whether it is to someone you lost…

a situation you are grieving…

or a part of yourself that needs healing.

Allow yourself to express what has been held in your heart.

Are you ready to proceed?

Pause.

Now close your eyes.

Breathing in through the nose…

and out through the mouth.

Though physically apart, their essence remains in your heart.

With an open heart and open hands, feel their presence with you now.

Visualise the person, place, thing, situation, or memory in front of you.

Now express what you never got to say.

Say what your heart needed to say.

Say what was left unsaid.

Say it out loud now.

Pause.

If there is anything left you want to say…

say it now.

Pause.

Take this moment to remain still.

Shoulders back.

Chest up.

Chin up.

Hands on the heart.

Feel your heart open as grief departs…

replaced with love…

trust…

grace…

and gratitude.

Take a long breath and remain with your eyes closed.

In this stillness, notice if any message or reply comes back to you from this person, place, thing, or situation.

Pause.

When you are ready, take three refreshing breaths…

and know that you are back…

reconnected with love and spirit.

When you are ready, open your eyes.

How was that?

How are you feeling?

Pause.

Now take your pen and journal.

It is time to write a letter of unconditional love to the person or situation you used to grieve.

You may begin:

Dear person, place, thing, or situation I grieve…

Express your love.

Express your gratitude.

Express whatever needs to be expressed in order to heal fully.

Share from your heart.

Begin writing now.

Pause.

After this session, you may choose to continue this letter, read it aloud to yourself, send it if appropriate, or safely burn it as a symbolic act of releasing this grief once and for all.

Now let's integrate your new truth.

Put down your pen and stand up.

Take a long breath in…

and out.

Roll your shoulders back.

Chest up.

Chin up.

Shake your body gently.

Feel freedom in your heart and mind.

Feel the old grief and sadness being replaced by grace and unconditional love.

Pause.

How are you feeling so far?

Pause.

Would you be open to integrating your new truth further with a sound activation?

The sound to activate the Heart Energy Centre is YAM.

Grounding down…

feet on the Earth…

roots going deep into the core of the Earth.

At the same time, imagine your Crown Energy Centre being lifted upward like a magnet.

Open your heart.

Take a big breath all the way in.

3…

2…

1…

YAMMMMMMMMM…

Again…

YAMMMMMMMMM…

Feel this vibration moving through your Heart Energy Centre.

Feel love flowing through your body.

Feel grief softening into grace.

Pause.

Take a seat.

How are you feeling now?

Imagine your life in the future and what is possible for you now.

With this new level of awareness and freedom, how are you feeling compared to the beginning of the session?

Thank you for allowing yourself to receive this healing.

Thank you for your courage.

Thank you for allowing me to share this sacred space with you.

Take one final deep breath in…

and slowly exhale.

Fully return to the room.`,
};

// ────────────────────────────────────────────────────────────────
// 5. THROAT — Lies → Truth
// ────────────────────────────────────────────────────────────────

const THROAT: FullHealingScript = {
  id: 'throat',
  title: 'Throat Energy Centre',
  subtitle: 'Lies → Truth · Personal Development',
  lifeArea: 'Personal Development / Truth',
  blockingEmotion: 'Lies / Suppression',
  newEmotion: 'Truth',
  bijaSound: 'HAM',
  color: '#3D9DC4',
  durationMin: 20,
  body: `Welcome.

Today we are working with the throat energy centre.

This centre is connected to truth, expression, authenticity, communication, and living in alignment with your values.

Today is not about going back in time.

Today is about looking honestly at what is happening in your life right now.

Where you may be suppressing yourself.

Where you may be holding back.

Where you may be saying yes when your truth is no.

Where you may be hiding parts of yourself in order to feel safe, accepted, or approved of.

This is a private space.

A safe space.

A sacred space for truth.

Take a deep breath in…

…and slowly exhale.

Before we begin, I'm going to ask for your permission.

Do you give your conscious mind full access and permission to fully trust, surrender, and let go in this experience today?

Do you give your unconscious and subconscious mind permission to fully trust, surrender, and let go in this experience today?

And do I, as your guide today, have your permission to guide you and hold space for you?

Beautiful.

Now gently close your eyes.

Allow your body to soften.

Take a deep breath in…

…and slowly exhale.

With each breath, become more present.

More grounded.

More here.

Imagine roots extending from the soles of your feet deep down into the Earth below.

Feel these roots connecting you to the grounding energy of the Earth.

With each breath, feel this calming force anchoring you in the present moment.

You are grounded.

You are supported.

You are ready to explore the truth of your mind, body, heart, and soul.

Take one more deep breath in…

…and slowly exhale.

Now gently open your eyes.

We are going to work through the present moment.

Things happening in your life right now.

Take a deep breath in…

…and as you exhale, let go of any barriers that may be in your way.

Open your journal, or simply reflect quietly within yourself.

Ask yourself now…

Where do I lie to myself?

Where am I deceiving myself?

Where am I telling myself I am not enough?

Too old?

Too unwell?

Not smart enough?

Not worthy?

Not lovable?

Where am I pretending I am content when deep down, I know it is not my truth?

Where am I making excuses to avoid action, change, or growth?

Breathe deeply through your throat centre.

Allow the truth to come forward.

Write it now.

Pause.

Now ask yourself…

Where do I lie to others?

Where have I not been completely honest?

Where have I said, "I'm okay," when I was not okay?

Where have I declined help when I truly needed support?

Where has pride overridden honesty?

Where have I avoided a difficult truth in a relationship, family situation, friendship, workplace, or intimate connection?

Breathe through your throat.

This is not about judgement.

This is about awareness.

Write it now.

Pause.

Now ask yourself…

Where do I subordinate or minimise myself?

Where do I hold back my true self to avoid conflict?

Where do I shrink to fit in?

Where do I stay in the shadows instead of fully expressing who I am?

Where am I not being completely myself?

Where am I settling?

Where am I avoiding confrontation?

Where am I not speaking my truth because of fear, guilt, shame, or perceived inadequacy?

Write it now.

Pause.

Now ask yourself…

Where am I holding back the truth of who I really am?

What part of me wants to be expressed?

What part of me has been waiting for permission?

What truth have I been avoiding?

What do I know in my heart but have not yet said out loud?

Breathe deeply.

Let the truth rise.

Write it now.

Pause.

Now take a deep breath in…

…and slowly exhale.

You are doing beautifully.

This awareness is powerful.

This honesty is healing.

Now place one hand gently over your heart…

and one hand gently over your throat.

Ask your heart…

What are my true values?

What matters most to me now?

What kind of person am I here to become?

What truth does my heart want my voice to express?

Pause.

Now imagine a beautiful blue light glowing in your throat.

Soft.

Clear.

Bright.

Expanding with every breath.

This blue light is clearing distortion.

Clearing suppression.

Clearing fear of judgement.

Clearing the need to hide.

Allow this blue light to open your throat centre.

Allow it to reconnect your voice with your heart.

Your throat is the instrument.

Your heart is the signal.

Your truth is the song.

Take a deep breath in…

…and slowly exhale.

Now ask yourself…

What action can I take today to live more truthfully?

What conversation do I need to have?

What boundary do I need to set?

What truth do I need to admit to myself?

What part of myself am I ready to express more fully?

Pause.

Now imagine yourself living in full alignment with your truth.

See yourself speaking clearly.

Standing calmly.

Expressing yourself with love and respect.

Not dominating.

Not shrinking.

Simply being truthful.

Honest.

Grounded.

Open.

Aligned.

Notice how this version of you feels.

Notice how they speak.

Notice how they move through life.

Now allow this version of you to merge fully into your body.

Take a deep breath in…

…and slowly exhale.

Now repeat after me, either silently or out loud:

My voice matters.

My truth matters.

I am safe to express myself.

I no longer need to minimise who I am.

I speak my truth with love.

I live in alignment with my heart.

I choose authenticity now.

Beautiful.

Now slowly stand up.

Roll your shoulders back.

Open your chest.

Lift your chin gently.

Feel your feet rooted into the Earth.

Imagine your crown being lifted upward by divine light.

Grounded below.

Lifted above.

Heart open.

Throat clear.

Take a deep breath in…

and together we activate this throat energy centre now.

3…

2…

1…

HAMMMMMMMMM…

Again…

HAMMMMMMMMM…

Feel the vibration moving through your throat.

Feel your voice opening.

Feel truth moving through your body.

Beautiful.

Take a deep breath in…

…and slowly exhale.

Now take a comfortable seat again.

Notice how your throat feels.

Notice how your heart feels.

Notice how your body feels after telling the truth to yourself.

Imagine your life in the future…

when you continue living from this truth.

What becomes possible now?

How do you feel now compared to the beginning of this session?

Thank you for your honesty today.

Thank you for your courage.

Thank you for allowing yourself to be seen.

And thank you for allowing me to hold this sacred space with you.

Take one final deep breath in…

…and slowly exhale.

And when you are ready…

fully return to the room.`,
};

// ────────────────────────────────────────────────────────────────
// 6. THIRD EYE — Illusion → Clarity
// ────────────────────────────────────────────────────────────────

const THIRD_EYE: FullHealingScript = {
  id: 'third-eye',
  title: 'Third Eye Energy Centre',
  subtitle: 'Illusion of Separation → Clarity',
  lifeArea: 'Career / Business',
  blockingEmotion: 'Illusion / Confusion',
  newEmotion: 'Clarity / Vision',
  bijaSound: 'UMM',
  color: '#5645A6',
  durationMin: 22,
  body: `Welcome.

Today we are working with the Third Eye Energy Centre.

This energy centre is connected to intuition…
vision…
inner wisdom…
clarity…
perception…
and spiritual awareness.

It governs your ability to connect to your higher self…
to trust your inner guidance…
and to see beyond illusion.

The deepest interference within this centre is the illusion of separation.

The false belief that you are disconnected from your purpose…
your intuition…
your higher wisdom…
your passions…
and the greater vision for your life.

This illusion creates confusion.

Misalignment.

A life built around external validation instead of soul guidance.

And today…
we begin dissolving that illusion.

Today is about reconnecting to your truth…
your vision…
your passion…
and the life your soul truly wants to experience.

You are safe here.

You are supported here.

You are fully held here.

Take a deep breath in…

…and slowly exhale.

Again…

breathing in deeply…

…and exhaling slowly.

Beautiful.

Before we begin, I'm going to ask for your permission to fully participate in this healing experience today.

Do you give your conscious mind permission to fully trust and engage in this experience today?

Do you give your unconscious and subconscious mind permission to fully trust and engage in this experience today?

And do I, as your guide today, have your permission to guide and support you through this process?

Beautiful.

Now gently close your eyes.

Allow your body to fully relax.

Take a deep breath in…

…and slowly exhale.

Feel the chair beneath you and know that you are safe.

Hear my voice and know that I will be with you throughout this process.

All the sounds around you, including my voice, are helping you relax even more deeply.

Now imagine strong glowing roots extending from the soles of your feet deep down into the Earth below.

Feel yourself grounding deeply into Mother Earth.

Safe.

Supported.

Protected.

Now imagine a beautiful indigo light above the top of your head.

Your crown energy centre gently opening upward.

As though the universe itself is softly lifting you upward while the Earth grounds you downward.

Grounded below.

Lifted above.

Safe between Heaven and Earth.

Take another deep breath in…

…and exhale slowly.

Take a few more deep breaths…

allowing this connection to deepen.

Feel a sense of tranquillity washing over you like a gentle wave of relaxation.

You are grounded.

Supported.

And ready to explore the depths of your mind and soul.

Pause.

Today we are going to work through the present moment.

Things happening in your life right now.

In a moment, I am going to ask you a series of breakthrough questions.

Just allow whatever needs to come up…
to rise to the surface.

And when you receive your answer…
you can open your eyes and write it down.

Are you ready to explore more deeply?

Pause.

Take a big breath in…

…and breathe out.

First question…

Where is the separation between what you are currently doing for a living…

and what you truly love?

Pause.

Where in your life do you feel disconnected from your true passions?

Where are you settling?

Where are you surviving instead of feeling fully alive?

Pause.

And if your current career already aligns with your passions…

where is the gap?

What parts feel out of alignment?

What would bring you even closer to what you truly love?

Pause.

When you are ready…

open your eyes…

and write down whatever came through.

Pause.

Beautiful.

Take another deep breath in…

…and out.

Second question…

What are the top one or two things you are most passionate about?

What do you genuinely love the most in this world?

Pause.

What gives you energy?

What lights you up?

What inspires you?

What do you constantly research, think about, talk about, or dream about?

Pause.

What makes your soul feel alive?

Pause.

When you are ready…

open your eyes and write down what came through.

Pause.

Beautiful.

Take another deep breath in…

…and out.

Third question…

How do those passions make you feel?

Pause.

Can you describe the feeling in your own words?

How does your body feel when you imagine yourself fully living in alignment with those passions?

Pause.

What emotions arise?

Freedom?

Joy?

Expansion?

Purpose?

Peace?

Excitement?

Pause.

Open your eyes when ready and write it down.

Pause.

Beautiful.

Take another deep breath in…

…and out.

Fourth question…

Why are these passions so important to you?

List the reasons why they matter deeply to your soul.

Pause.

What meaning do they bring into your life?

What part of your identity feels connected to them?

Why do they matter beyond money, success, or validation?

Pause.

Open your eyes when ready and write down your reflections.

Pause.

Beautiful.

Take another deep breath in…

…and out.

Fifth question…

Who can you think of that is already prospering from a similar passion?

Pause.

Who has already built a life around the things that light up their soul?

Who inspires you?

Who reminds you that this path is possible?

Pause.

Allow yourself to realise…

that there are people already living the kind of life your soul desires.

Pause.

Open your eyes and write down whoever comes to mind.

Pause.

Beautiful.

Take another deep breath in…

…and out.

Final question…

If you could prosper from your passions and achieve anything you truly wanted…

what would you be?

And what would you do?

Pause.

Imagine there were no limitations.

No fear.

No judgement.

No external expectations.

Who would you become?

What would your life look like?

How would you spend your days?

How would you serve the world?

Pause.

Now open your eyes…

and write down your vision.

Pause.

Beautiful.

You have done amazing so far.

Now gently close your eyes again.

Take a few deep breaths.

Reflect on everything that has just come through for you.

Pause.

Reflect on the things you truly love.

The things that make your soul feel alive.

The things that create meaning within you.

Pause.

And now ask yourself…

What specific actions can I begin taking today…

to move closer to living in alignment with these passions?

Pause.

What is one small step you can take immediately?

Pause.

What habits, routines, boundaries, or decisions would move you closer toward your truth?

Pause.

Now take another deep breath in…

…and out.

Allow your new truth to begin integrating into your body now.

Feel the illusion of separation dissolving.

Feel yourself reconnecting to your inner wisdom.

Your vision.

Your truth.

Your purpose.

Pause.

When you are ready…

open your eyes and write down the actions that came through.

Pause.

Beautiful.

How are you feeling now?

Pause.

Would you be open to integrating this healing further with a sound activation?

Pause.

While standing…

together we are going to make a specific sound to activate the Third Eye Energy Centre.

The sound to activate this powerful energy centre is UMM.

Stand with your feet grounded on the Earth.

Spread your legs apart.

Imagine your roots going deep into the core of the Earth below.

At the same time…

imagine your crown energy centre lifting upward like a magnet pulling you toward higher consciousness.

Grounded below.

Lifted above.

Heart open.

Third eye awakened.

Take a deep breath all the way in.

3…

2…

1…

UUMMMMMMMMM…

Again…

UUMMMMMMMMM…

Feel the vibration moving through your Third Eye Energy Centre.

Feel your intuition awakening.

Feel your clarity expanding.

Feel yourself reconnecting to your truth.

Pause.

Now slowly take a seat again.

Notice how your body feels.

Notice how your energy feels.

Notice how much clearer and more connected you feel compared to the beginning of this session.

Imagine your future now…

with this new level of awareness and alignment.

What becomes possible for you now?

Pause.

Thank you for allowing yourself to receive this healing today.

Thank you for your courage.

And thank you for allowing me to hold this sacred space with you.

Take one final deep breath in…

…and slowly exhale.

And when you are ready…

fully return to the room.`,
};

// ────────────────────────────────────────────────────────────────
// 7. CROWN — Disconnection → Connection
// ────────────────────────────────────────────────────────────────

const CROWN: FullHealingScript = {
  id: 'crown',
  title: 'Crown Energy Centre',
  subtitle: 'Disconnection → Connection',
  lifeArea: 'Spiritual Fulfilment',
  blockingEmotion: 'Disconnection',
  newEmotion: 'Connection / Surrender',
  bijaSound: 'AUM',
  color: '#9B5BA1',
  durationMin: 22,
  body: `Welcome.

Today we are working with the Crown Energy Centre.

The Crown Energy Centre is connected to your relationship with source, spirit, divine intelligence, surrender, faith, oneness, and your sense of being held by something greater than yourself.

It is located at the very top of the head.

When this centre is open, life feels guided. You trust the unfolding. You feel held even when you don't have answers.

When it is blocked, life can feel meaningless. Heavy. Alone. The mind takes over and tries to control everything because it has forgotten that anything larger is there.

This disconnection is not your fault.

Many of us were raised in a world that did not teach us how to feel the presence of something larger than the visible. So we filled the gap with overthinking, overworking, perfectionism, control, or numbing.

Today we begin restoring the connection.

You are safe here.

You are supported here.

You are fully held here.

Take a deep breath in…

…and slowly exhale.

Again…

breathing in deeply…

…and exhaling slowly.

Beautiful.

Before we begin, I'm going to ask for your permission to fully participate in this healing experience today.

Do you give your conscious mind permission to fully trust and engage in this experience today?

Do you give your unconscious and subconscious mind permission to fully trust and engage in this experience today?

And do I, as your guide today, have your permission to safely guide you through this process and safely bring you back into the present moment?

Beautiful.

Now gently close your eyes.

Allow your body to fully relax.

Take a deep breath in…

…and slowly exhale.

Feel the chair beneath you and know that you are safe.

Hear my voice and know that I am with you.

All the sounds around you, including my voice, are helping you relax even more deeply.

Imagine strong roots extending from the soles of your feet deep down into the Earth below.

Feel yourself grounding deeply into Mother Earth.

Safe.

Supported.

Protected.

Now imagine a beautiful violet light above the top of your head.

Your crown energy centre gently opening upward like a soft flower turning toward the sun.

As though the universe itself is lifting you upward while the Earth grounds you downward.

Grounded below.

Lifted above.

Safe between Heaven and Earth.

Take another deep breath in…

…and exhale slowly.

Now with your eyes closed, we are going to gently explore the moments in your life where you may have stopped trusting that something larger was holding you.

Take a big breath in…

exhale…

and relax.

Pause.

Bring your awareness to one metre above the top of your head.

Now move from one metre up to two metres above the top of your head.

You are now two metres above the top of your head, observing yourself safely.

As you stay above your timeline, begin going back in time now.

Back through your memories…

through your experiences…

all the way back…

to the earliest moment you remember feeling alone in a way that was deeper than physical.

A moment you decided, consciously or unconsciously, that you would have to do it all by yourself.

A moment you stopped trusting.

Go there now.

Pause.

Observe what is happening.

Notice where you are.

How old you are.

What has just happened.

What you needed and did not receive.

Pause.

Now notice the disconnection that was stored there.

The decision your young self made to stop reaching upward.

To rely only on yourself.

To not trust anything beyond what could be seen.

Pause.

Now expand this feeling.

Allow yourself to fully feel it so you no longer have to carry it unconsciously.

Breathe deeply.

Shoulders back.

You are safe.

You are held.

You were never as alone as it felt.

Pause.

Now send love to the younger version of yourself.

Tell them:

You are not alone.

You were never alone.

Something larger has been with you the whole time.

It is safe to trust again.

It is safe to be held.

Pause.

Now gently say goodbye to your younger self for now.

And as you continue breathing deeply, begin moving forward across the timeline…

back toward the present moment…

bringing back only the wisdom…

the openness…

the surrender…

and leaving behind the disconnection.

Pause.

One more big breath in…

and as you exhale, you are fully back in your body in…

3…

2…

1…

When you are ready, gently open your eyes.

Beautiful.

Now take your journal and begin writing.

When did you first decide you had to do it all alone?

What happened that made you stop trusting?

Pause.

Where in your life right now are you still trying to control everything because part of you does not believe anything larger is there?

Pause.

What would it feel like to be held? To be guided? To stop pushing for a moment?

Pause.

Now write a letter to something larger than you. To source, to spirit, to the universe, to whatever name feels true. Write what you have been afraid to say. Write what you have been afraid to ask for. Write what you have been carrying alone.

You may begin:

Dear source…

I have been carrying…

I am ready to surrender…

I am ready to trust…

Please help me…

Thank you for…

Write whatever your heart needs to say.

Pause.

Beautiful.

Now write:

"My new truth is…"

Pause.

Now slowly stand up.

Roll your shoulders back.

Chest open.

Chin up.

Take a deep breath in…

…and out.

Feel the energy moving through your body.

Feel yourself softer.

More open.

More held.

Pause.

How are you feeling now?

Pause.

Would you be open to integrating this healing further with a sound activation?

The sound to activate the Crown Energy Centre is AUM.

Grounding down…

feet on the Earth…

roots going deep into the core of the Earth.

At the same time, imagine your crown energy centre being lifted upward like a magnet pulling you toward source.

Open your heart.

Take a deep breath all the way in.

3…

2…

1…

AUMMMMMMMMM…

Again…

AUMMMMMMMMM…

Feel the vibration moving through the top of your head.

Feel the connection opening.

Feel yourself being held by something larger than you.

Pause.

Now slowly take a seat again.

Notice how your body feels.

Notice how your energy feels.

Notice how much lighter and more held you feel compared to the beginning of this session.

Imagine your life in the future with this restored connection. What becomes possible for you now?

Pause.

Thank you for allowing yourself to receive this healing today.

Thank you for your courage.

And thank you for allowing me to hold this sacred space with you.

Take one final deep breath in…

…and slowly exhale.

And when you are ready…

fully return to the room.`,
};

// ────────────────────────────────────────────────────────────────
// 8. SOUL STAR — Limitation → Expansion
// ────────────────────────────────────────────────────────────────

const SOUL_STAR: FullHealingScript = {
  id: 'soul-star',
  title: 'Soul Star Energy Centre',
  subtitle: 'Limitation → Expansion',
  lifeArea: 'Time & Expansion',
  blockingEmotion: 'Limitation',
  newEmotion: 'Expansion',
  bijaSound: 'AH',
  color: '#C9B7E5',
  durationMin: 22,
  body: `Welcome.

Today we are working with the Soul Star Energy Centre.

The Soul Star is the eighth energy centre, located just above the crown of your head. About twenty to thirty centimetres above where your physical body ends.

This centre is connected to your relationship with time, with presence, and with the version of you that exists beyond the body, beyond the role, beyond the story.

When this centre is open, you feel timeless. You can rest in the present. You feel like more than your circumstances.

When it is blocked, life feels small. You feel rushed. You feel limited by time, by age, by past decisions, by who you have been so far. The body feels heavy because the soul is being asked to fit into a space that is too small for it.

Today we are going to gently dissolve the feeling of limitation and expand back into the part of you that has always been more than this.

You are safe here.

You are supported here.

You are fully held here.

Take a deep breath in…

…and slowly exhale.

Again…

breathing in deeply…

…and exhaling slowly.

Beautiful.

Before we begin, I'm going to ask for your permission to fully participate in this healing experience today.

Do you give your conscious mind permission to fully trust and engage in this experience today?

Do you give your unconscious and subconscious mind permission to fully trust and engage in this experience today?

And do I, as your guide today, have your permission to guide you safely through this process and safely bring you back into the present moment?

Beautiful.

Now gently close your eyes.

Allow your body to fully relax.

Take a deep breath in…

…and slowly exhale.

Feel the chair beneath you and know that you are safe.

Hear my voice and know that I am with you.

All the sounds around you, including my voice, are helping you relax even more deeply.

Imagine strong roots extending from the soles of your feet deep down into the Earth below.

Feel yourself grounding deeply into Mother Earth.

Safe.

Supported.

Protected.

Now imagine a soft golden white light pouring down from above the top of your head.

Not just to the crown, but higher.

Twenty centimetres above your head.

Thirty centimetres above your head.

Feel this golden white light gently opening the eighth energy centre.

Grounded below.

Lifted above.

Safe between Earth and infinity.

Take another deep breath in…

…and exhale slowly.

Now with your eyes closed, we are going to gently explore the limitations you have been carrying.

Take a big breath in…

exhale…

and relax.

Pause.

Bring your awareness to one metre above the top of your head.

Now move to two metres above the top of your head.

Now keep going higher.

Three metres.

Five metres.

Ten metres above your body.

You are now floating high above your own life. Looking down at your timeline as if it were a long quiet river beneath you.

You are completely safe here.

Completely held.

Pause.

From this place above your life, ask yourself…

Where am I limiting myself?

What story am I still living inside that is too small for who I actually am?

What role have I outgrown that I am still wearing because it is familiar?

Pause.

What have I told myself I am too old for?

Too late for?

Too far gone for?

Too tired for?

Pause.

Notice the limitation you have been carrying.

Not as something wrong with you.

As something the soul is ready to release.

Pause.

Now expand this awareness.

Make it so big that you can see clearly how small the story has been compared to who you actually are.

Pause.

Now from this same high place, look forward along your timeline.

Into the future.

Five years from now.

Ten years from now.

Twenty years from now.

See the version of you who is no longer holding any of this limitation.

Notice how they walk.

How they speak.

How they hold themselves.

How they move through the world.

Notice what is in their life that is not yet in yours.

Notice what they have released.

Notice what they have claimed.

Pause.

Now invite this future version of you toward you.

Across the timeline.

Toward the present moment.

Feel them merging into your body now.

Their wisdom.

Their freedom.

Their expansion.

Their presence.

All of it merging into you here, now.

Pause.

You are no longer separate from this future version.

You are them.

You always were.

Pause.

Now gently begin returning your awareness back down through the layers of light.

Ten metres above your body.

Five metres.

Two metres.

One metre.

Back into your body.

In…

3…

2…

1…

When you are ready, gently open your eyes.

Beautiful.

Now take your journal and begin writing.

What limitation did you see that you are ready to release?

What story has been too small for who you actually are?

Pause.

What did your future self show you that you had not let yourself imagine until now?

Pause.

What is one small thing you can do today that the future version of you would do?

Pause.

Now write a letter to the part of you that has been holding the limitation in place.

A letter of release.

A letter of thanks for keeping you safe until now.

A letter that lets it go.

You may begin:

Dear part of me that has been holding me small…

Thank you for…

I release you now…

I am ready to be the version of me I just met…

Write whatever your heart needs to say.

Pause.

Beautiful.

Now write:

"My new truth is…"

Pause.

Now slowly stand up.

Roll your shoulders back.

Chest open.

Chin lifted.

Take a deep breath in…

…and out.

Feel the energy moving through your body.

Feel yourself bigger than the room.

Bigger than the story.

Bigger than the limitation.

Pause.

How are you feeling now?

Pause.

Would you be open to integrating this healing further with a sound activation?

The sound to activate the Soul Star Energy Centre is AH.

A long open AH that releases everything held in the throat and opens the body upward.

Grounding down…

feet on the Earth…

roots going deep into the core of the Earth.

At the same time, imagine the column of light above your head extending upward into infinity.

Open your heart.

Take a deep breath all the way in.

3…

2…

1…

AHHHHHHHHHH…

Again…

AHHHHHHHHHH…

Feel the vibration moving through the centre above your head.

Feel limitation dissolving.

Feel expansion returning.

Feel yourself remembering how much more you are.

Pause.

Now slowly take a seat again.

Notice how your body feels.

Notice how your energy feels.

Notice how much lighter and more spacious you feel compared to the beginning of this session.

Imagine your life now from this expanded place. What becomes possible for you now?

Pause.

Thank you for allowing yourself to receive this healing today.

Thank you for your courage.

And thank you for allowing me to hold this sacred space with you.

Take one final deep breath in…

…and slowly exhale.

And when you are ready…

fully return to the room.`,
};

// ────────────────────────────────────────────────────────────────
// EXPORTS
// ────────────────────────────────────────────────────────────────

export const FULL_HEALING_SCRIPTS: Record<SpineChakraId, FullHealingScript> = {
  root: ROOT,
  sacral: SACRAL,
  'solar-plexus': SOLAR_PLEXUS,
  heart: HEART,
  throat: THROAT,
  'third-eye': THIRD_EYE,
  crown: CROWN,
  'soul-star': SOUL_STAR,
};

export const FULL_HEALING_SCRIPTS_ORDERED: FullHealingScript[] = [
  ROOT,
  SACRAL,
  SOLAR_PLEXUS,
  HEART,
  THROAT,
  THIRD_EYE,
  CROWN,
  SOUL_STAR,
];

export function getFullHealingScript(
  id: string
): FullHealingScript | undefined {
  const normalised = (id === 'solar' ? 'solar-plexus'
    : id === 'thirdEye' || id === 'third_eye' ? 'third-eye'
    : id === 'soulStar' || id === 'soul_star' ? 'soul-star'
    : id) as SpineChakraId;
  return FULL_HEALING_SCRIPTS[normalised];
}
