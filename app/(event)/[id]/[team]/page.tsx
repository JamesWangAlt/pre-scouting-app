import NotFound from "@/app/not-found";
import prisma from "@/lib/prisma";
import ClientPage from "@/app/(event)/[id]/[team]/client-page";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import QuickTooltip from "@/components/quick-tooltip";
import {ArrowDown, ArrowUp, Minus} from "lucide-react";
import {percentile, withOrdinalSuffix} from "@/lib/utils";
import EventCard from "@/app/(event)/[id]/[team]/event-card";

export default async function Team({params}: { params: { id: string, team: string } }) {
    if (!+params.id || !+params.team) return NotFound();

    const event = await prisma.event.findUnique(
          {
              where: {
                  id: +params.id
              }
          }
    );
    if (!event) return NotFound();
    const team = await prisma.team.findUnique(
          {
              where: {
                  number: +params.team
              }
          }
    )
    const teamEntry = (await prisma.teamEntry.findMany(
          {
              where: {
                  eventId: event.id,
                  teamNumber: +params.team
              }
          }
    ))[0];
    if (!team || !teamEntry) return NotFound();

    const events = await prisma.teamEvent.findMany(
          {
              where: {
                  teamNumber: team.number
              }
          }
    );

    const matches = await prisma.matchEntry.findMany(
          {
              where: {
                  teamEntryId: teamEntry.id
              }
          }
    );

    function epaValue(epa: number, deviation: number) {
        let arrow;
        let placement;
        if (deviation > 0.2) {
            arrow = (<ArrowUp className={"w-5 h-5 self-center"}/>);
            placement = "Above";
        } else if (deviation > -0.2) {
            arrow = (<Minus className={"w-5 h-5 self-center"}/>);
            placement = "Around";
        } else {
            arrow = (<ArrowDown className={"w-5 h-5 self-center"}/>);
            placement = "Below";
        }

        return (
              <QuickTooltip
                    trigger={
                        <div className={"flex gap-0.5"}>
                            <p>{epa.toFixed(1)}</p>
                            {arrow}
                        </div>
                    }
                    content={`${placement} average; ${withOrdinalSuffix((percentile(deviation) * 100))} percentile`}
              />
        );
    }

    return (
          <ClientPage
                event={event}
                team={team}
                teamEntry={teamEntry}
                teamDetails={
                    <Card className={"w-full sm:w-80"}>
                        <CardHeader>
                            <CardTitle>Team Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={"flex justify-between"}>
                                <p className={"muted"}>Region</p>
                                <p>{team.state}</p>
                            </div>
                            <div className={"flex justify-between"}>
                                <p className={"muted"}>School</p>
                                <p className={"w-48 overflow-x-scroll text-nowrap text-right"}>
                                    {team.school?.replace("&", "and")}
                                </p>
                            </div>
                            <div className={"flex justify-between"}>
                                <p className={"muted"}>Rookie year</p>
                                <p>{team.rookieYear}</p>
                            </div>
                        </CardContent>
                    </Card>
                }
                statistics={matches.length == 0 ? (
                      <p className={"text-center muted mt-8"}>
                          This team has not competed in any matches this season, yet.
                      </p>
                ) : (
                      <div className={"mt-sm flex flex-wrap gap-6"}>
                          <Card className={"w-full sm:w-60"}>
                              <CardHeader>
                                  <CardTitle>Record</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Wins</p>
                                      <p>{teamEntry.wins}</p>
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Losses</p>
                                      <p>{teamEntry.losses}</p>
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Total</p>
                                      <p>{(teamEntry.wins ?? 0) + (teamEntry.ties ?? 0) + (teamEntry.losses ?? 0)}</p>
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Win rate</p>
                                      <p>
                                          <QuickTooltip
                                                trigger={
                                                    <>
                                                        {((teamEntry.wins ?? 0) / ((teamEntry.wins ?? 0) + (teamEntry.losses ?? 0)) * 100).toFixed()}
                                                        <span className={"muted"}> of 100</span>
                                                    </>
                                                }
                                                content={`Theoretically would win ${
                                                      ((teamEntry.wins ?? 0) / ((teamEntry.wins ?? 0) + (teamEntry.losses ?? 0)) * 100).toFixed()
                                                } out of 100 matches if put up against the same opponents`}
                                          />
                                      </p>
                                  </div>
                              </CardContent>
                          </Card>
                          <Card className={"w-full sm:w-60"}>
                              <CardHeader>
                                  <CardTitle><QuickTooltip trigger={"Rank"} content={"Based on EPA"}/></CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>World</p>
                                      <p>{teamEntry.worldRank} <span
                                            className={"muted"}>of {teamEntry.worldTotal}</span>
                                      </p>
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Country</p>
                                      <p>{teamEntry.countyRank} <span
                                            className={"muted"}>of {teamEntry.countyTotal}</span></p>
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>District</p>
                                      <p>{teamEntry.districtRank} <span
                                            className={"muted"}>of {teamEntry.districtTotal}</span></p>
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Event</p>
                                      <p>{teamEntry.eventRank} <span
                                            className={"muted"}>of {teamEntry.eventTotal}</span>
                                      </p>
                                  </div>
                              </CardContent>
                          </Card>
                          <Card className={"w-full sm:w-60"}>
                              <CardHeader>
                                  <CardTitle><QuickTooltip trigger={"EPA"} content={
                                      <a className={"hover:underline"} href={"https://www.statbotics.io"}
                                         target={"_blank"}>Expected Points Added</a>
                                  }/></CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Auto</p>
                                      {epaValue(teamEntry.autoEPA ?? 0, teamEntry.autoDeviation ?? 0)}
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Teleop</p>
                                      {epaValue(teamEntry.teleopEPA ?? 0, teamEntry.teleopDeviation ?? 0)}
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Endgame</p>
                                      {epaValue(teamEntry.endgameEPA ?? 0, teamEntry.endgameDeviation ?? 0)}
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Total</p>
                                      {epaValue(teamEntry.totalEPA ?? 0, teamEntry.totalDeviation ?? 0)}
                                  </div>
                              </CardContent>
                          </Card>
                      </div>
                )}
                events={
                    <>
                        {
                            events
                                  .filter(value => value.eventKey != event.key)
                                  .sort((a, b) =>
                                        new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
                                  .map(value => (
                                        <EventCard key={value.eventKey} event={value}/>
                                  ))
                        }
                    </>
                }
          />
    );
}