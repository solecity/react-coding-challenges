import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";

import { fetchToken, getData } from "../../../common/services/api";

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  componentDidMount() {
    const handleData = (data, item) =>
      this.setState({ ...this.state, [item]: data });

    fetchToken().then((token) =>
      Promise.all([
        getData(token, "new-releases", "albums", (data) =>
          handleData(data, "newReleases")
        ),
        getData(token, "featured-playlists", "playlists", (data) =>
          handleData(data, "playlists")
        ),
        getData(token, "categories", "categories", (data) =>
          handleData(data, "categories")
        ),
      ])
    );
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
