# How do real family-tree schemas model this?

Research for wayfinder issue #4 (child of map issue #1). Question: how do real family-tree
schemas model spouses/partners, parent roles, multi-family membership, adoption/step
relations, and the split between "a person" and "a person in a family"?

**Method:** primary sources only — the GEDCOM 7 spec, the GEDCOM 5.5.1 spec, the Gramps XML
DTD/source, the GEDCOM X specifications, and FamilySearch's own first-party API docs/help.
No blog posts. Every claim below is traceable to a source listed in
[Sources](#sources).

---

## 1. The core split: person is global, family holds only pointers (GEDCOM)

GEDCOM models genealogy with exactly two record types that matter here:

- `INDI` — an individual person, carrying all person data (name, sex, events, facts).
- `FAM` — a *family unit* (a union/household), carrying union-level data (marriage event,
  divorce, family facts) and **only pointers** to people.

From the GEDCOM 7 grammar ([spec §3.2, `FAMILY_RECORD`]):

```
n @XREF:FAM@ FAM                           {1:1}
  +1 HUSB @<XREF:INDI>@                    {0:1}
  +1 WIFE @<XREF:INDI>@                    {0:1}
  +1 CHIL @<XREF:INDI>@                    {0:M}
```

and from the person side ([spec §3.1, `INDIVIDUAL_RECORD`]):

```
  +1 FAMC @<XREF:FAM>@                     {0:M}   ← families where this person is a child
     +2 PEDI <Enum>                        {0:1}   ← type of this child↔family link
     +2 STAT <Enum>                        {0:1}   ← confidence in this link
  +1 FAMS @<XREF:FAM>@                     {0:M}   ← families where this person is a partner/parent
```

Key consequences:

- **A person belongs to any number of families.** `FAMC` and `FAMS` are both `{0:M}` on the
  person; `HUSB`/`WIFE`/`CHIL` are pointers *back* the other way. The pointers are
  bi-directional ("Individual records are linked to Family records by use of bi-directional
  pointers" — §3.1).
- **Person attributes live only on the person.** A `FAM` never duplicates a name or a birth
  date; it only holds `@I1@`-style pointers. GEDCOM 5.5.1 is explicit that multi-union people
  are handled by appearing as a *pointer* in several records: "If, for example, a man
  participated in more than one family union, then he would appear in more than one
  `FAM_RECORD`" (§3.2, `FAM_RECORD`).
- **Role/state of a membership is stored on the link, not on the person or the family.**
  `PEDI` and `STAT` are substructures of the person's `FAMC` pointer — i.e. they annotate the
  (person, family) edge.

## 2. Spouses/partners, same-sex and non-marital partnerships

- A `FAM` has at most **two** partners: `HUSB {0:1}` and `WIFE {0:1}`. Two slots, regardless
  of gender.
- GEDCOM 7 explicitly de-genders the slots: "The `FAM` record may also be used for cultural
  parallels to this, including nuclear families, marriage, **cohabitation**, fostering,
  adoption, and so on, **regardless of the gender of the partners**. Sex, gender, titles, and
  roles of partners should not be inferred based on the partner that the `HUSB` or `WIFE`
  structure points to" (§3.2). The spec itself calls them "partners", "parents" or "spouses"
  collectively, and `HUSB`/`WIFE` are described as **layout hints** for tree views.
- Same-sex and non-marital partnerships therefore need no special casing: create a `FAM`, put
  two people in it, optionally add a `MARR`/`EVEN` (e.g. "cohabitation") or nothing at all.
  The old 5.5.1 spec's gendered phrasing ("assumes that the HUSB/father is male and
  WIFE/mother is female") is exactly what GEDCOM 7 removed.
- **More than two partners:** "Family structures with more than 2 partners may either use
  several `FAM` records or use `ASSOCIATION_STRUCTURE`s to indicate additional partners"
  (§3.2). I.e. serial unions = several `FAM`s; simultaneous partners beyond two are a known
  gap — the spec says outright: "The `FAM` record will be revised in a future version to more
  fully express the diversity of human family relationships."
- Partnership status is an *event/fact on the family record* (`MARR`, `DIV`, `ENGA`, `CENS`,
  or generic `EVEN` with `TYPE`), not a column on a person.
- Gramps adds an explicit family relationship type: `FamilyRelType.MARRIED` ("may be either an
  opposite or a same sex relationship"), `UNMARRIED`, `CIVIL_UNION`, `UNKNOWN`, `CUSTOM`
  (`gramps/gen/lib/family.py`, `set_relationship`). So unmarried partnership and civil union
  are first-class values there.

## 3. Parent roles: biological vs adoptive vs foster vs step

The role belongs to the **child↔family link**, via `PEDI` (pedigree) on `FAMC`:

- GEDCOM 5.5.1 `PEDIGREE_LINKAGE_TYPE := [ adopted | birth | foster | sealing ]` —
  "adopted = indicates adoptive parents; birth = indicates birth parents; foster = indicates
  child was included in a foster or guardian family; sealing = indicates child was sealed to
  parents other than birth parents."
- GEDCOM 7 `g7:enumset-PEDI` = `ADOPTED`, `BIRTH`, `FOSTER`, `SEALING`, `OTHER` (with
  `PHRASE`), plus a caveat worth reading before copying it: "It is known that some users have
  interpreted `BIRTH` to mean 'genetic parent' and others to mean 'social parent at time of
  birth' … applications should refrain from asserting it has either meaning". The spec also
  admits: "The structures for foster children in particular, and family relationships in
  general, are known to have undesirable limitations and are likely to change in a future
  version."
- **Per-parent granularity:** adoption isn't just per-family — `ADOP` subordinate to `FAMC`
  says *which* partner adopted: GEDCOM 5.5.1 `ADOPTED_BY_WHICH_PARENT := [ HUSB | WIFE |
  BOTH ]`; GEDCOM 7 `g7:enumset-ADOP` = `HUSB` / `WIFE` / `BOTH`. So one family unit can hold
  "adopted by HUSB only" while the link is otherwise `BIRTH`.
- **Adoption as an event:** `ADOP` is an individual event — "Creation of a legally approved
  child-parent relationship that does not exist biologically" — with its own `FAMC` pointer
  (so biological and adoptive families can be told apart by *which event* the `FAMC` hangs
  off: "biological parents can be shown by a `FAMC` pointer subordinate to the birth event").
- **Link confidence** is a separate axis: `g7:enumset-FAMC-STAT` / 5.5.1
  `CHILD_LINKAGE_STATUS := [challenged | disproven | proven]` — the same (person, family) edge
  can additionally be marked suspect or disproven.
- **Step relations have no first-class value in GEDCOM.** Neither 5.5.1's
  `[adopted|birth|foster|sealing]` nor GEDCOM 7's set contains "step"; you'd use
  `OTHER`/`PHRASE` or model the step household as its own `FAM`. Gramps and GEDCOM X *do*
  have first-class step (below).
- Non-parental relations (godparents etc.) are *not* family links: `ASSO` + `ROLE`
  (`g7:enumset-ROLE`: `GODP`, `FATH`, `MOTH`, `CHIL`, `HUSB`, `CLERGY`, …) attaches an
  arbitrary person to an event/person, and the spec forbids using `ASSO` for anything
  expressible via `FAMS`/`FAMC`/`CHIL`.

## 4. Other well-regarded models

### Gramps XML (gramps-project.org, DTD v1.7.2)

- `person` contains `childof*` and `parentin*` — **repeatable pointers** to families:
  "families I'm a child in" and "families I'm a parent in". Same person-in-many-families
  shape as GEDCOM, expressed from the person side.
- `family` contains `father?`, `mother?` (single optional pointers each) and `childref*`.
- **The membership link carries the roles — per parent side:**

  ```
  <!-- (None|Birth|Adopted|Stepchild|Sponsored|Foster|Other|Unknown) -->
  <!ELEMENT childref (citationref*,noteref*)>
  <!ATTLIST childref hlink IDREF #REQUIRED mrel CDATA #IMPLIED frel CDATA #IMPLIED>
  ```

  `mrel` = mother's relationship to the child, `frel` = father's relationship to the child —
  so a child can be `Birth` of the mother and `Adopted` of the father **within the same
  family unit**. The value list also includes **`Stepchild`** and `Foster`, i.e. step is
  first-class here.
- A `family` has an explicit `rel type` (MARRIED / UNMARRIED / CIVIL_UNION / UNKNOWN /
  CUSTOM) — partnership kind is data on the union, as above.

### GEDCOM X + FamilySearch platform API

- GEDCOM X's conceptual model defines only `Person`, `Relationship`, `SourceDescription`
  (etc.) as **top-level** data types — there is **no `Family` entity at all**. A "family" is
  an emergent view over two relationship types:
  - `http://gedcomx.org/Couple` — "a relationship of a pair of persons"
  - `http://gedcomx.org/ParentChild` — "a relationship from a parent to a child"
  (`Relationship` = `{ type, person1, person2, facts }`; direction is person1 → person2.)
- Parent role lives on the **parent↔child relationship**, as a fact type
  (`specifications/fact-types-specification.md`, "Parent-Child Relationship Fact Types"):
  `AdoptiveParent`, `BiologicalParent`, `FosterParent`, `GuardianParent`, `StepParent`,
  `SociologicalParent`, `SurrogateParent`, `ChildOrder`, `EnteringHeir`, `ExitingHeir`.
- FamilySearch's API materializes this as a **ternary row** `ChildAndParentsRelationship`
  with `parent1`, `parent2`, `child`, and **separate role facts per parent** — their own
  example shows one relationship where `"parent1Facts": [{ "type": "http://gedcomx.org/
  AdoptiveParent" }]` and `"parent2Facts": [{ "type": "http://gedcomx.org/BiologicalParent" }]`
  side by side (Create Child and Parents Relationship, developers.familysearch.org).
- FamilySearch's product documents exactly five relationship types: **Adopted, Biological,
  Guardianship, Foster, Step** (first-party help article #1134, "Biological, step, adopted,
  and foster relationships in Family Tree"). Multiple parent sets per child are normal —
  a child gets a separate child-and-parents relationship for biological parents and for
  adoptive/step/foster parents.

## 5. The person-vs-membership question: three precedent options

| # | Option | Precedent | Shape |
|---|--------|-----------|-------|
| A | **Person global + membership edge as an entity** | GEDCOM `INDI`/`FAM` pointers; Gramps `childof`/`parentin` + `childref` | `Person` (global) ↔ `FamilyMembership`/`ChildInFamily` (join row *with its own columns*: role, per-parent roles, status, dates) ↔ `Family`/`Union`. Person appears in N memberships; the edge carries the semantics. |
| B | **No family entity; relationships only** | GEDCOM X / FamilySearch API | `Person` + `Couple` row (2 persons, status/dates) + `ParentChild` edge (role enum on the edge). "Family" is a derived view of a couple + their children. FamilySearch's `ChildAndParentsRelationship` is a pragmatic ternary variant of this. |
| C | **Person owned by a family (person = membership)** | *No standards precedent* | A person row carries both the person's data and a `familyId`; one row per family ⇒ a person in two families must be duplicated (or the FK widened). This is what our current `FamilyMember` does. |

Notes that sharpen the choice:

- Options A and B differ on whether the *union/household* ("the Smith family, married 1960,
  4 kids, one address, one photo album") is a first-class thing. GEDCOM and Gramps say yes;
  GEDCOM X says no, keep only relationships. Our app has a real `Family` aggregate (and an
  access-control scope), so A maps most directly; B is the "purist" alternative.
- Placement of the role enum matters: GEDCOM puts it on the **child↔family** link (`PEDI`),
  Gramps puts it on the **child↔family** link but *per parent side* (`mrel`/`frel`), GEDCOM X
  puts it on the **parent↔child** edge. All three reject putting it on the parent, the
  child, or the family as a whole — `parentId1`/`parentId2` implicitly asserts "both parents
  are biological and there are at most two", which no standard accepts.
- Our `User`/`UserFamily` concern is *access control*, which none of these standards model
  (GEDCOM's `SUBM` submitter record is separate from `INDI`/`FAM` for the same reason).
  Genealogical membership and "who may edit" should stay separate tables.

### Prisma-shaped example of the same problem

[github.com/punit-gajjar/family-tree — `apps/api/prisma/schema.prisma`](https://github.com/punit-gajjar/family-tree/blob/HEAD/apps/api/prisma/schema.prisma)
(Prisma + explicit edge graph):

```prisma
model Member {                      // person, global
  outgoingEdges RelationshipEdge[] @relation("FromMember")
  incomingEdges RelationshipEdge[] @relation("ToMember")
  ...
}
model RelationMaster {              // dictionary: FATHER, MOTHER, SPOUSE …
  code String @unique
  isSpousal Boolean @default(false)
  isParental Boolean @default(false)
  inverseCode String?
  ...
}
model RelationshipEdge {            // typed, attributed membership/relationship row
  fromMember Member   @relation("FromMember", ...)
  toMember   Member   @relation("ToMember", ...)
  relation   RelationMaster @relation(...)
  @@unique([fromMemberId, toMemberId, relationId])
  ...
}
```

This is Option B in Prisma clothing: persons are global, and "who is whose spouse/parent"
is an edge row with a role code — no person-owned `familyId`, no `parentId1`/`parentId2`.
(The role is denormalized flags on `RelationMaster` rather than an enum column on the edge;
either style works. Note Prisma's *implicit* m-n relations can't carry extra columns, so any
of options A/B requires explicit join models — which is what you want here anyway.)

---

## 6. What this means for our schema

1. **Make `Person` global; stop putting person data in a family-owned row.** Every standard
   keeps attributes on the person and lets the family hold only pointers/memberships
   (GEDCOM `HUSB/WIFE/CHIL`, Gramps `father/mother/childref`). Our `FamilyMember` merges
   person and membership — duplicating a remarried grandparent across families is currently
   the only way to express reality, and there is zero precedent for that shape.
2. **Replace `parentId1`/`parentId2` with an edge table** (`ParentChild`: childId, parentId,
   `role`). That single change unlocks: >2 parents, mixed roles (bio mother + adoptive
   father, exactly GEDCOM's `FAMC-ADOP` and FamilySearch's example), per-edge status
   (`proven`/`challenged` — GEDCOM `FAMC-STAT`), and step/foster/guardian parents. Suggested
   role enum: take FamilySearch's five — `BIOLOGICAL, ADOPTIVE, STEP, FOSTER, GUARDIAN` —
   GEDCOM's own `PEDI` set notably lacks `STEP` and the spec flags it as a known weakness.
3. **Model the partner union explicitly** (a `Union`/`Couple` row, or GEDCOM-style `FAM` with
   two partner slots + events): one person → many unions; partnership kind
   (married/unmarried/civil union/none) is data on the union (Gramps `FamilyRelType`), not
   inferred from gender (GEDCOM 7 explicitly forbids inferring sex/gender/roles from the
   `HUSB`/`WIFE` slots).
4. **Person-vs-membership must be decided, and the precedent-supported answers are A or B.**
   A (global `Person` + `FamilyMembership` join carrying role/status) fits our existing
   `Family`/`UserFamily` shape with the least disruption; B (drop the genealogical family
   entity, keep couple + parent-child edges) is what FamilySearch itself runs. C — the
   current `FamilyMember` — is the only option no established model uses.
5. **Keep access control (`User`/`UserFamily`) orthogonal to genealogy.** The family you can
   *log into* is not the family a person *belongs to*; GEDCOM likewise separates the
   submitter (`SUBM`) from `INDI`/`FAM`. If they stay conflated, moving a person between
   genealogical families would change who can see them.
6. Photos/notes belong to whatever entity actually owns them — union-level photos on the
   union, person photos on the person (GEDCOM puts `MULTIMEDIA` links under whichever record
   the media documents) — which also tells us what to do when photos move out of `Bytes`
   blobs.

## Sources

- [FamilySearch GEDCOM 7.0 specification (HTML)](https://gedcom.io/specifications/FamilySearchGEDCOMv7.html) —
  §3.1 `INDIVIDUAL_RECORD`, §3.2 `FAMILY_RECORD`, `g7:enumset-PEDI`, `g7:enumset-ADOP`,
  `g7:enumset-FAMC-STAT`, `g7:enumset-ROLE`, `g7:ADOP`, `g7:INDI-FAMC`, `g7:FAMS`.
  Spec index: <https://gedcom.io/specs/>
- [FamilySearch GEDCOM 5.5.1 (HTML with inline errata)](https://gedcom.io/specifications/ged551-with-inline-errata.html) —
  `FAM_RECORD`, `INDIVIDUAL_RECORD`, `CHILD_TO_FAMILY_LINK`, `PEDIGREE_LINKAGE_TYPE`,
  `ADOPTED_BY_WHICH_PARENT`, `CHILD_LINKAGE_STATUS`, `SPOUSE_TO_FAMILY_LINK`.
- [Gramps XML DTD v1.7.2](https://github.com/gramps-project/gramps/blob/master/data/grampsxml.dtd) —
  `person (… childof* … parentin* …)`, `family (rel?, father?, mother?, … childref* …)`,
  `childref` `mrel`/`frel` value list.
- [Gramps `gramps/gen/lib/family.py`](https://github.com/gramps-project/gramps/blob/master/gramps/gen/lib/family.py) —
  `set_relationship` / `FamilyRelType` (MARRIED, UNMARRIED, CIVIL_UNION, UNKNOWN, CUSTOM).
- [GEDCOM X Conceptual Model 1.0](https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md) —
  top-level data types; §2.1 `Person`, §2.2 `Relationship` (`Couple`, `ParentChild`).
- [GEDCOM X Relationship Types 1.0](https://github.com/FamilySearch/gedcomx/blob/master/specifications/relationship-types-specification.md) —
  `Couple`, `ParentChild`, `AncestorDescendant`, `EnslavedBy`, `Godparent`.
- [GEDCOM X Fact Types](https://github.com/FamilySearch/gedcomx/blob/master/specifications/fact-types-specification.md) —
  "Parent-Child Relationship Fact Types": `AdoptiveParent`, `BiologicalParent`,
  `FosterParent`, `GuardianParent`, `StepParent`, `SociologicalParent`, `SurrogateParent`, …
- [FamilySearch API — Create Child and Parents Relationship](https://developers.familysearch.org/main/docs/create-child-and-parents-relationship) —
  `parent1Facts`/`parent2Facts` with `AdoptiveParent` + `BiologicalParent` in one record.
- [FamilySearch help #1134 — Biological, step, adopted, and foster relationships in Family Tree](https://www.familysearch.org/en/help/helpcenter/article/how-do-i-specify-biological-step-adopted-and-foster-relationships-in-family-tree) —
  five relationship types: Adopted, Biological, Guardianship, Foster, Step.
- [Prisma example: punit-gajjar/family-tree `schema.prisma`](https://github.com/punit-gajjar/family-tree/blob/HEAD/apps/api/prisma/schema.prisma) —
  `Member` + `RelationshipEdge` + `RelationMaster` edge-graph modelling of the same problem.
