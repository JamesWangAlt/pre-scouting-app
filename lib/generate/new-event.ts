// Promise<ActionResult> see link-shorter
import prisma from "@/lib/prisma";
import {tba} from "@/lib/tba/tba";

export default async function NewEvent(key: string, year: number, name: string) {
    // Add catches

    const eventId = (await prisma.event.create({
        data: {
            key: key,
            year: year,
            name: name,
            city: (await tba.getEvent(key)).data.city
        }
    })).id;

    const tbaTeams = (await tba.getEventTeams(key)).data;
    for (const tbaTeam of tbaTeams) {
        let team = await prisma.team.findUnique({
            where: {
                number: tbaTeam.team_number
            }
        });

        if (!team) {
            team = await prisma.team.create(
                  {
                      data: {
                          number: tbaTeam.team_number,
                          key: tbaTeam.key,
                          name: tbaTeam.nickname,
                          rookieYear: tbaTeam.rookie_year,
                      }
                  }
            )
        }

        // Autofill team information.

        const teamEntryId = (await prisma.teamEntry.create(
              {
                  data: {
                      key: tbaTeam.key,
                      eventId: eventId,
                      teamNumber: tbaTeam.team_number
                  }
              }
        )).id;

        const tbaMatches = (await tba.getTeamMatchesByYear(year)).data;
        for (const tbaMatch of tbaMatches) {
            const match = await prisma.match.findUnique({
                where: {
                    key: tbaMatch.key
                }
            });
            if (!match) {
                await prisma.match.create(
                      {
                          data: {
                              key: tbaMatch.key,
                              matchNumber: tbaMatch.match_number,
                              redScore: tbaMatch.alliances?.red?.score,
                              blueScore: tbaMatch.alliances?.blue?.score,
                              scoreBreakdown: JSON.stringify(tbaMatch.score_breakdown),
                              videoId: tbaMatch.videos?.find(x => x.type == "youtube")?.key
                          }
                      }
                )
            }

            await prisma.matchEntry.create(
                  {
                      data: {
                          teamEntryId: teamEntryId,
                          matchKey: tbaMatch.key
                      }
                  }
            )
        }
    }
}