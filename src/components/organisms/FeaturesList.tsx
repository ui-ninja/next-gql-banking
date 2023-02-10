import { Box, Grid, GridItem } from "@chakra-ui/react";

import { H1 } from "../atoms/typography";
import FeatureCard from "../molecules/FeatureCard";

import HomeConstants from "../../constants/HomeConstants";

export default function FeaturesList() {
  return (
    <Box>
      <H1 textAlign="center">{HomeConstants.featureCards.heading}</H1>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
        {HomeConstants.featureCards.features.map((card) => (
          <GridItem key={card.heading}>
            <FeatureCard
              heading={card.heading}
              description={card.description}
              link={card.link}
              icon={card.icon}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
