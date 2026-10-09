"""Editable source for Vayas_Life_Assignment_2_Creative_Strategy_UPDATED.pdf.

Rebuilds the Assignment 2 creative strategy with ReportLab, matching the original
layout (A4, 68pt side margins, sage/ivory palette, Helvetica-metric type). Liberation
Sans is embedded so "Vāyas" renders correctly. Run: python3 build_strategy_pdf.py OUT.pdf
"""
import sys
from reportlab.lib.colors import Color, white
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, Frame, KeepTogether, NextPageTemplate,
                                PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle)
from reportlab.platypus.flowables import HRFlowable

FONT_DIR = "/usr/share/fonts/truetype/liberation/"
pdfmetrics.registerFont(TTFont("Body", FONT_DIR + "LiberationSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Body-Bold", FONT_DIR + "LiberationSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Body-Italic", FONT_DIR + "LiberationSans-Italic.ttf"))
pdfmetrics.registerFontFamily("Body", normal="Body", bold="Body-Bold", italic="Body-Italic")

# Palette sampled from the original document.
INK = Color(0.161, 0.176, 0.153)      # #292D27
SAGE = Color(0.408, 0.471, 0.365)     # #68785D
MUTED = Color(0.396, 0.416, 0.384)    # #656A62
IVORY = Color(0.965, 0.949, 0.914)    # #F6F2E9
BORDER = Color(0.847, 0.816, 0.757)   # #D8D0C1
GRID = Color(0.855, 0.867, 0.835)     # #DADDD5
MIST = Color(0.906, 0.922, 0.882)     # #E7EBE1
MIST_LINE = Color(0.788, 0.820, 0.761)

PAGE_W, PAGE_H = A4
LEFT, RIGHT = 68, PAGE_W - 59.3      # content 68 → 536
WIDTH = RIGHT - LEFT
FOOTER = "VĀYAS LIFE  |  ASSIGNMENT 2: CREATIVE STRATEGY"

S = {
    "eyebrow": ParagraphStyle("eyebrow", fontName="Body-Bold", fontSize=9, leading=12, textColor=SAGE, spaceAfter=10),
    "h1": ParagraphStyle("h1", fontName="Body-Bold", fontSize=21, leading=25, textColor=INK, spaceAfter=10),
    "h2": ParagraphStyle("h2", fontName="Body-Bold", fontSize=13, leading=16, textColor=SAGE, spaceBefore=8, spaceAfter=6),
    "h3": ParagraphStyle("h3", fontName="Body-Bold", fontSize=10.5, leading=14, textColor=SAGE, spaceBefore=2, spaceAfter=6),
    "body": ParagraphStyle("body", fontName="Body", fontSize=9.4, leading=14, textColor=INK, spaceAfter=6, alignment=TA_LEFT),
    "note": ParagraphStyle("note", fontName="Body", fontSize=8, leading=12, textColor=MUTED, spaceAfter=6),
    "cell": ParagraphStyle("cell", fontName="Body", fontSize=8.2, leading=11.5, textColor=INK),
    "cellb": ParagraphStyle("cellb", fontName="Body-Bold", fontSize=8.2, leading=11.5, textColor=INK),
    "head": ParagraphStyle("head", fontName="Body-Bold", fontSize=8.5, leading=11, textColor=white),
    "bullet": ParagraphStyle("bullet", fontName="Body", bulletFontName="Body", fontSize=9.4, leading=14, textColor=INK, leftIndent=12, bulletIndent=2, spaceAfter=3),
    "box": ParagraphStyle("box", fontName="Body-Bold", fontSize=13, leading=18, textColor=INK),
    "boxlabel": ParagraphStyle("boxlabel", fontName="Body-Bold", fontSize=7.5, leading=10, textColor=SAGE, spaceAfter=8),
}


def P(text, style="body"):
    return Paragraph(text, S[style])


def bullets(items):
    return [Paragraph(t, S["bullet"], bulletText="•") for t in items]


def table(header, rows, widths, bold_first=True):
    data = [[P(h, "head") for h in header]]
    for r in rows:
        data.append([P(c, "cellb" if (i == 0 and bold_first) else "cell") for i, c in enumerate(r)])
    t = Table(data, colWidths=widths, repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), SAGE),
        ("GRID", (0, 0), (-1, -1), 0.35, GRID),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]
    for i in range(1, len(data)):
        style.append(("BACKGROUND", (0, i), (-1, i), IVORY if i % 2 == 0 else white))
    t.setStyle(TableStyle(style))
    return t


def boxed(flowables, bg, line, pad=14):
    t = Table([[flowables]], colWidths=[WIDTH + 4])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg), ("BOX", (0, 0), (-1, -1), 0.7, line),
        ("LEFTPADDING", (0, 0), (-1, -1), pad + 6), ("RIGHTPADDING", (0, 0), (-1, -1), pad),
        ("TOPPADDING", (0, 0), (-1, -1), pad), ("BOTTOMPADDING", (0, 0), (-1, -1), pad),
    ]))
    return t


def rule():
    return HRFlowable(width="100%", thickness=0.6, color=BORDER, spaceBefore=8, spaceAfter=10)


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(BORDER); canvas.setLineWidth(0.5)
    canvas.line(51, 42.9, 544, 42.9)
    canvas.setFont("Body", 7.5); canvas.setFillColor(MUTED)
    canvas.drawString(51, 30, FOOTER)
    canvas.drawRightString(544, 30, str(doc.page))
    canvas.restoreState()


def build(out):
    doc = BaseDocTemplate(out, pagesize=A4, title="Vāyas Life — Assignment 2: Creative Strategy",
                          author="Kanishk Prabhat", subject="Creative strategy for the Vāyas Life video-ad assignment")
    cover = Frame(LEFT - 4, 60, WIDTH + 8, PAGE_H - 160, id="cover", showBoundary=0)
    body = Frame(LEFT - 4, 62, WIDTH + 8, PAGE_H - 62 - 52, id="body", showBoundary=0)
    doc.addPageTemplates([PageTemplate("cover", [cover]), PageTemplate("body", [body], onPage=footer)])

    story = []
    # ── Cover ────────────────────────────────────────────────────────────────
    story += [
        Spacer(1, 10),
        P("ASSIGNMENT 02 / CREATIVE STRATEGY", "eyebrow"), Spacer(1, 22),
        Paragraph("From Insight<br/>to Impact.", ParagraphStyle("cover", fontName="Body-Bold", fontSize=31, leading=34, textColor=INK)),
        Spacer(1, 18),
        Paragraph("Vāyas Life — Calcium for Women 30+", ParagraphStyle("sub", fontName="Body", fontSize=13, leading=16, textColor=MUTED)),
        Spacer(1, 40),
        boxed([P("THE CREATIVE CHALLENGE", "boxlabel"),
               P("Make bone health feel relevant to everyday life — then connect that relevance to Vāyas through a clear, emotionally resonant product story.", "box")], IVORY, BORDER, pad=12),
        Spacer(1, 62),
        P("A creative rationale covering audience, human insight, concept strategy, storytelling choices, and the role of each proposed ad."),
        HRFlowable(width="99%", thickness=0.7, color=INK, spaceBefore=16, spaceAfter=16, hAlign="LEFT"),
        P("Prepared as a creative strategy document for the Vāyas Life video-ad assignment.", "note"),
        NextPageTemplate("body"), PageBreak(),
    ]

    # ── 01 Strategic foundation (unchanged) ─────────────────────────────────
    story += [
        P("01 / Strategic foundation", "eyebrow"),
        P("What are we trying to solve?", "h1"),
        P("Calcium and bone-health advertising can easily become clinical, product-heavy, or fear-led. Our creative approach is to make the category feel more human: connect bone health to the routines, relationships, and moments women care about, then introduce Vāyas as an option within a broader wellness routine."),
        P("The audience", "h3"),
        P("Primary audience: women aged 30–45 who are balancing work, family, personal responsibilities, and their own health. They may already think about food, movement, and everyday wellness, but bone health can feel less immediate or easier to overlook."),
        P("Secondary emotional audience", "h3"),
        P("For the animated bonus concept, the story features an older grandmother. She is a storytelling character, not the sole target audience. Her experience makes the value of everyday independence and meaningful family moments tangible to the broader 30+ audience."),
        P("Core strategic insight", "h3"),
        P("People are more likely to connect with a health message when it relates to something they already value. Rather than leading with a statistic or a medical warning, these concepts begin with familiar routines and meaningful moments, then make bone health part of that conversation."),
        P("Creative principles", "h3"),
        table(["NO.", "PRINCIPLE", "HOW IT GUIDES THE WORK"], [
            ["01", "<b>Lead with a human truth</b>", "Start from everyday routines, overlooked needs, or meaningful relationships."],
            ["02", "<b>Make the message easy to grasp</b>", "Use a clear hook and one primary message per ad."],
            ["03", "<b>Let the product enter naturally</b>", "Move from relevance to product recognition, then to a clear CTA."],
            ["04", "<b>Stay responsible</b>", "Avoid implying that the product cures pain, reverses ageing, or guarantees a health outcome."],
        ], [42, 140, WIDTH - 182]),
        Spacer(1, 14),
        P("Important distinction: the audience definitions and insights here are creative hypotheses for concept development, not findings from quantitative consumer research.", "note"),
        PageBreak(),
    ]

    # ── 02 Creative routes: concepts 1–2 (unchanged) ────────────────────────
    def concept(title, parts):
        out = [P(title, "h1")]
        for head, text in parts:
            out += [P(head, "h3"), P(text)]
        return out

    story += [P("02 / Creative routes", "eyebrow")]
    story += concept("Concept 1 — Your Body Changes", [
        ("Audience", "Women aged 30–45 who are becoming more conscious of changing nutritional needs and long-term wellness."),
        ("Core insight", "As women move through different life stages, their routines and priorities evolve, but their own nutritional needs can easily take a back seat."),
        ("Why we made this ad", "This route makes the subject feel relevant without using fear. Everyday moments show how a woman’s routine changes, leading to the thought that her wellness routine should evolve too. The product becomes a considered addition to that routine rather than a dramatic solution to a problem."),
        ("Creative role", "Educational and awareness-led. It helps introduce the category through a life-stage lens and gives the brand a calm, supportive tone."),
    ])
    story += [rule()]
    story += concept("Concept 2 — The 30+ Checklist", [
        ("Audience", "Women aged 30–45 balancing work, family, movement, meals, and personal responsibilities while trying to maintain healthier habits."),
        ("Core insight", "Women often remember daily wellness habits, but specific aspects of long-term health can be overlooked when life is busy."),
        ("Why we made this ad", "A checklist is instantly recognizable and gives the video a simple, mobile-first hook. The viewer sees familiar wellness habits being checked off before the ad asks a new question: is bone health on the list? That creates a natural bridge from a relatable idea to the Vāyas product reveal and CTA."),
        ("Creative role", "The strongest performance-oriented route: concise, structured, easy to understand without sound, and straightforward to test through different hooks, pacing, and opening frames."),
    ])
    story += [PageBreak()]

    # ── 03 Creative routes: concept 3 (unchanged) + concept 4 (aligned to final cut)
    story += [P("03 / Creative routes", "eyebrow")]
    story += concept("Concept 3 — Take Care of What Carries You", [
        ("Audience", "Women aged 30–50 with demanding daily routines who want to remain engaged in their responsibilities, interests, and everyday activities."),
        ("Core insight", "Women depend on their bodies to carry them through everyday life, yet self-care can become secondary to everything else they do."),
        ("Why we made this ad", "The line connects the body’s everyday work to the idea of self-care. Familiar actions—getting ready, walking, moving through responsibilities—make the message feel personal rather than clinical. It gives Vāyas a role in a broader wellness conversation while keeping the story rooted in the audience’s own life."),
        ("Creative role", "Emotion-led lifestyle storytelling. It can build affinity and recall through a memorable line and relatable everyday moments."),
    ])
    story += [rule()]
    story += [
        P("Concept 4 — For More Moments Like These", "h1"),
        P("Format: Animated bonus brand film · Final on-screen headline: “For All the Moments Still to Come.”", "h3"),
        P("Audience", "h3"),
        P("Intended audience: women aged 30+ who value family, independence, everyday wellbeing, and maintaining a wellness routine."),
        P("Core insight", "h3"),
        P("Health and wellness can feel more personally meaningful when connected to the ordinary moments and relationships people hope to continue enjoying."),
        P("Why we made this ad", "h3"),
        P("A fully animated grandmother story offers a more distinctive emotional route than conventional supplement advertising. Play with her granddaughter establishes what matters; the effort of standing up, a staircase climbed with effort and a quiet moment at the window introduce vulnerability; gardening resolves the story under the line “For All the Moments Still to Come.” The product then enters as part of a broader wellness routine. The grandmother is the story’s emotional anchor, not a claim that the product treats pain or restores mobility."),
        P("Creative role", "h3"),
        P("Brand differentiation and emotional storytelling. It expands the campaign’s creative range beyond direct-response formats and demonstrates a more cinematic, character-led approach."),
        PageBreak(),
    ]

    # ── 04 Recommended execution (unchanged) ────────────────────────────────
    story += [
        P("04 / Recommended execution", "eyebrow"),
        P("Lead with The 30+ Checklist", "h1"),
        P("For the primary video-ad execution, the checklist is the clearest starting point because the concept, hook, and product transition can be understood quickly on a mobile screen. The animated film can sit alongside it as a bonus brand-building route."),
        Spacer(1, 4),
        table(["TIME", "STORY BEAT", "PURPOSE"], [
            ["0–3 sec", "Checklist hook: “Your 30+ checklist”", "Win attention and establish the organizing device."],
            ["3–6 sec", "Balanced meals", "Start with a familiar wellness habit."],
            ["6–9 sec", "Regular movement", "Build recognition and rhythm."],
            ["9–12 sec", "Time for yourself", "Make the checklist personal and relatable."],
            ["12–15 sec", "“Remember your bone health”", "Introduce the key reminder and bridge to product."],
            ["15–19 sec", "Vāyas product reveal", "Create product recognition and communicate the verified product name."],
            ["19–24 sec", "Verified ingredient list", "Provide formulation information clearly and accurately."],
            ["24–30 sec", "Brand close and “Shop Now”", "Leave enough time for brand recall and action."],
        ], [70, 175, WIDTH - 245]),
        Spacer(1, 10),
        P("Execution rationale", "h2"),
        P("The opening uses a recognizable behavior rather than a product claim. The checklist creates structure and pace; the bone-health reminder provides the strategic turn; the product shot delivers recognition; and the CTA closes the story. Typography and checkbox sounds reinforce the device, while restrained visuals keep the product credible and premium."),
        P("Production notes", "h2"),
        P("Use the real approved pack image for product shots. Add all typography in post-production. Verify the ingredient list against current official packaging before publishing. Keep the video legible without sound and use safe margins for Reels placements."),
        PageBreak(),
    ]

    # ── 05 Bonus route — rewritten to match the final 20-second cut ─────────
    story += [
        P("05 / Bonus route and evaluation", "eyebrow"),
        P("Animated bonus: For All the Moments Still to Come", "h1"),
        P("Working concept title: <i>For More Moments Like These</i>. The final video’s on-screen emotional headline is “FOR ALL THE MOMENTS STILL TO COME.” This section describes the final 20-second cut.", "note"),
        P("Concept", "h3"),
        P("A grandmother’s ordinary day — playing with her granddaughter, standing up from the floor, climbing the stairs, watching from the window, tending her garden — becomes a reminder of the moments still ahead. Vāyas enters at the end as part of a wellness routine that looks forward to those moments, not as a fix for anything that came before."),
        P("Audience", "h3"),
        P("Intended audience: women aged 30+ who value family, independence, everyday wellbeing, and maintaining a wellness routine. This is the audience the creative is designed for, not a proven audience insight. The grandmother is a storytelling character rather than the sole target."),
        P("Human insight", "h3"),
        P("Health and wellness can feel more personally meaningful when connected to the ordinary moments and relationships people hope to continue enjoying."),
        P("Creative rationale", "h3"),
        P("Animation lets the film carry emotion without a spokesperson or testimonial, and a stylized 3D world gives the brand a look that stands apart from live-action supplement advertising. Opening on block play with her granddaughter establishes warmth and a relationship the viewer cares about within the first seconds."),
        P("A first, gentle sign of effort comes as she stands up from play and rests a hand on her lower back. The cut to the staircase, climbed with visible effort, and then to a quiet moment beside the window — watching her granddaughter play in the garden — builds that vulnerability with restraint. The film shows effort and reflection, not pain, diagnosis or decline."),
        P("Gardening provides the emotional resolution: she is back among her plants, doing something she enjoys, so the story completes on its own terms before any product appears. The line “For All the Moments Still to Come” then turns the scene toward the future, linking what she values today to a forward-looking reason to look after everyday wellbeing — which is where the wellness message begins."),
        KeepTogether([P("Format and execution", "h3"),
        P("A 20-second, vertical 9:16 (1080 × 1920, 24 fps), stylized 3D animated social-media ad."),
        Spacer(1, 2),
        table(["TIME", "BEAT", "WHAT THE VIEWER SEES", "ON-SCREEN TEXT"], [
            ["0–4 sec", "Emotional opening", "An elderly grandmother and her young granddaughter play together with building blocks on the floor. As she stands up, she rests a hand on her lower back while her granddaughter looks up at her.", "—"],
            ["4–7 sec", "Everyday physical challenge", "The grandmother climbs stairs with visible effort.", "—"],
            ["7–11 sec", "Reflective moment", "She sits beside a window and looks toward her granddaughter playing in the garden.", "—"],
            ["11–15 sec", "Emotional payoff", "The grandmother is gardening.", "“FOR ALL THE MOMENTS STILL TO COME.”"],
            ["15–20 sec", "Product reveal and CTA", "The Vāyas bottle appears in a clean, premium product shot.", "“VĀYAS / CALCIUM FOR WOMEN 30+”, then “MAKE BONE HEALTH PART OF YOUR WELLNESS ROUTINE.” and “SHOP NOW.”"],
        ], [58, 92, 168, WIDTH - 318]),
        Spacer(1, 4),
        P("“—” indicates no on-screen text during that beat.", "note")]),
        P("Product integration and CTA", "h3"),
        P("The product is held back until the story is complete, so the final five seconds move the viewer from feeling to a specific next step. The emotional headline leaves a question about the future; the product shot answers it with something concrete and routine — the Vāyas Calcium for Women 30+ pack, identified on screen as “VĀYAS / CALCIUM FOR WOMEN 30+.” The closing copy frames the product as one part of a broader habit rather than a solution:"),
        boxed([P("MAKE BONE HEALTH PART OF YOUR WELLNESS ROUTINE.", "box"),
               Spacer(1, 4), P("SHOP NOW.", "cellb")], IVORY, BORDER, pad=10),
        Spacer(1, 6),
        P("The supers make no ingredient, dosage or benefit claims. Use the real approved pack image in any published version."),
        P("Strategic role", "h3"),
        P("This is the campaign’s emotional brand-storytelling route, distinct from the direct, checklist-driven structure of The 30+ Checklist. The checklist is built for quick comprehension and response; the animated film is intended to build emotional relevance and brand recall, and to show how one product can be approached through both direct-response and brand-building creative. Its effectiveness is a hypothesis and must be validated through campaign testing."),
        KeepTogether([P("Measurement", "h3"),
        P("Proposed KPIs for testing — these are measures to track, not results. No campaign has run and no performance figures are reported here."),
        *bullets([
            "<b>3-second video views</b> — whether the opening earns attention in the feed.",
            "<b>Video completion rate</b> — whether the story holds viewers through to the product reveal.",
            "<b>Click-through rate</b> — whether the closing CTA prompts action.",
            "<b>Cost per landing-page view</b> — how efficiently the ad drives qualified visits.",
            "<b>Conversion rate</b> — downstream action from those visits.",
        ])]),
        Spacer(1, 2),
        P("For the checklist ad, compare hook retention, three-second views, average watch time, completed-view rate, click-through rate, landing-page views, and conversion performance. Evaluate both against campaign objectives and media context rather than assuming one format will outperform before testing."),
        KeepTogether([P("Responsible communication", "h3"),
        P("The creative should not imply that Vāyas cures pain, treats osteoporosis, restores mobility, reverses ageing, or guarantees future health. The grandmother’s effort as she stands and on the stairs is a storytelling moment, not a medical diagnosis, and the film does not suggest that taking the product resolves it. Her story is an emotional metaphor — not a testimonial, clinical evidence, or proof of efficacy. The product is framed as part of a broader wellness routine, consistent with the final on-screen copy, and any ingredient statement must be verified against the approved product pack or official information.")]),
        Spacer(1, 12),
        KeepTogether(boxed([P("THE CREATIVE THESIS", "boxlabel"),
                            P("Make bone health feel relevant to real life. Use the right creative route to earn attention, build emotional relevance, introduce Vāyas clearly, and invite the next step.", "box")], MIST, MIST_LINE, pad=12)),
    ]
    doc.build(story)


if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else "Vayas_Life_Assignment_2_Creative_Strategy_UPDATED.pdf")
